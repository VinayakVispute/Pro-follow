import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import multiMonthPlugin from "@fullcalendar/multimonth";
import interactionPlugin from "@fullcalendar/interaction";
import { EventClickArg } from "@fullcalendar/core";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useApiClient } from "@/hooks/useApiClient";
import { ICompanyDetailed, ICommunicationLog } from "@/types";
import Spinner from "@/components/shared/Spinner";

interface Event {
  id: string;
  title: string;
  start: string;
  description?: string;
  allDay?: boolean;
  className?: string;
  end?: string;
}

const CommunicationCalendar: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const apiClient = useApiClient();

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await apiClient.get("/api/schedule/companies");
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      const companies: ICompanyDetailed[] = response.data.data;
      const calendarEvents = generateEventsFromCompanies(companies);
      setEvents(calendarEvents);
      setLoading(false);
    } catch (err: any) {
      console.error("Error fetching companies:", err);
      setLoading(false);
    }
  };

  const generateEventsFromCompanies = (
    companies: ICompanyDetailed[]
  ): Event[] => {
    const events: Event[] = [];

    companies.forEach((company) => {
      // Add next scheduled communication
      events.push({
        id: `next-${company._id}`,
        // @ts-ignore
        title: `${company.name} - ${company.nextScheduledCommunication.name}`,
        // @ts-ignore

        start: company.nextScheduledCommunication.date,
        description: `Next scheduled communication for ${company.name}`,
        className: "bg-blue-500",
      });

      // Add overdue communication if applicable
      if (company.isOverdue) {
        events.push({
          id: `overdue-${company._id}`,
          title: `${company.name} - Overdue`,
          start: new Date().toISOString(), // Set to today
          description: `Overdue communication for ${company.name}`,
          className: "bg-red-500",
        });
      }

      // Add due today communication if applicable
      if (company.isDueToday) {
        events.push({
          id: `duetoday-${company._id}`,
          title: `${company.name} - Due Today`,
          start: new Date().toISOString(),
          description: `Communication due today for ${company.name}`,
          className: "bg-yellow-500",
        });
      }

      // Add last five communications
      company.lastFiveCommunications.forEach(
        (comm: ICommunicationLog, index: number) => {
          events.push({
            id: `last-${company._id}-${index}`,
            title: `${company.name} - ${comm.method.name}`,
            start: new Date(comm.createdAt).toISOString(),
            description: comm.notes || `Past communication for ${company.name}`,
            className: "bg-green-500",
          });
        }
      );
    });

    return events;
  };

  const filteredEvents = events.filter(
    (event) =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEventClick = (info: EventClickArg) => {
    alert(
      `Event: ${info.event.title}\nDetails: ${info.event.extendedProps.description}`
    );
  };

  if (loading) return <Spinner />;

  return (
    <div className="p-4 bg-white dark:bg-gray-900 rounded-lg shadow">
      <div className="mb-4 flex items-center justify-end ">
        <div
          className={cn(
            "flex items-center transition-all duration-300 ease-in-out",
            isSearchOpen ? "w-full sm:w-72" : "w-10"
          )}
        >
          <div className="relative flex w-full items-center">
            {isSearchOpen && (
              <Input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-8"
              />
            )}
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "absolute right-0",
                isSearchOpen ? "hover:bg-transparent" : ""
              )}
              onClick={() => {
                if (isSearchOpen) {
                  setSearchQuery("");
                }
                setIsSearchOpen(!isSearchOpen);
              }}
            >
              {isSearchOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Search className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </div>
      <style>
        {`
          .fc {
            --fc-border-color: #e5e7eb;
            --fc-button-bg-color: #1e293b;
            --fc-button-border-color: #1e293b;
            --fc-button-hover-bg-color: #334155;
            --fc-button-hover-border-color: #334155;
            --fc-button-active-bg-color: #475569;
            --fc-button-active-border-color: #475569;
            --fc-event-bg-color: #3b82f6;
            --fc-event-border-color: #3b82f6;
            --fc-today-bg-color: #dbeafe;
            --fc-now-indicator-color: #ef4444;
          }

          .fc-theme-standard .fc-scrollgrid {
            border: 1px solid #e5e7eb;
          }

          .fc .fc-button {
            padding: 0.5rem 1rem;
            font-weight: 500;
            border-radius: 0.375rem;
          }

          .fc .fc-button-primary:not(:disabled).fc-button-active,
          .fc .fc-button-primary:not(:disabled):active {
            background-color: #475569;
            border-color: #475569;
          }

          .fc .fc-toolbar-title {
            font-size: 1.5rem;
            font-weight: 600;
          }

          .fc .fc-event {
            border-radius: 0.25rem;
            padding: 2px 4px;
            font-size: 0.875rem;
          }

          .fc .fc-multimonth-title {
            font-size: 1.25rem;
            font-weight: 600;
            padding: 1rem;
          }

          .dark .fc {
            --fc-border-color: #374151;
            --fc-page-bg-color: #111827;
            --fc-neutral-bg-color: #1f2937;
            --fc-today-bg-color: rgba(59, 130, 246, 0.1);
          }

          .dark .fc-theme-standard td, 
          .dark .fc-theme-standard th {
            border-color: #374151;
          }

          .dark .fc-theme-standard .fc-scrollgrid {
            border-color: #374151;
          }
          
          .dark .fc-col-header-cell-cushion,
          .dark .fc-daygrid-day-number,
          .dark .fc-toolbar-title {
            color: #f3f4f6;
          }
        `}
      </style>
      <FullCalendar
        plugins={[
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin,
          multiMonthPlugin,
        ]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,multiMonthYear",
        }}
        views={{
          multiMonthYear: {
            type: "multiMonth",
            duration: { months: 12 },
          },
        }}
        events={filteredEvents}
        eventClick={handleEventClick}
        editable={false}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        weekends={true}
        nowIndicator={true}
        height="auto"
        eventTimeFormat={{
          hour: "2-digit",
          minute: "2-digit",
          meridiem: false,
          hour12: false,
        }}
      />
    </div>
  );
};

export default CommunicationCalendar;
