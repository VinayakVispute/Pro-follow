import { useState } from "react";
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

interface Event {
  id: string;
  title: string;
  start: string;
  description?: string;
  allDay?: boolean;
  className?: string;
  end?: string;
}

const CommunicationCalendar = () => {
  const [events, setEvents] = useState<Event[]>([
    {
      id: "1",
      title: "Conference",
      start: "2025-01-01",
      description: "Annual tech conference",
      className: "bg-blue-500",
      allDay: true,
    },

    {
      id: "3",
      title: "Lunch",
      start: "2025-01-02T12:00:00",
      description: "Team lunch",
      className: "bg-green-500",
    },
    {
      id: "4",
      title: "Long Event",
      start: "2025-01-07",
      end: "2025-01-10",
      description: "Multi-day workshop",
      className: "bg-blue-500",
      allDay: true,
    },
    {
      id: "5",
      title: "Repeating Event",
      start: "2025-01-09T16:00:00",
      description: "Weekly team sync",
      className: "bg-purple-500",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const filteredEvents = events.filter(
    (event) =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDateClick = (info: any) => {
    const title = prompt("Enter Event Title:");
    if (title) {
      setEvents([
        ...events,
        {
          id: Date.now().toString(),
          title,
          start: info.dateStr,
          className: "bg-blue-500",
        },
      ]);
    }
  };

  const handleEventClick = (info: EventClickArg) => {
    alert(
      `Event: ${info.event.title}\nDetails: ${info.event.extendedProps.description}`
    );
  };

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
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        editable={true}
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
