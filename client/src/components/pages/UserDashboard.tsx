import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { CommunicationModal } from "../shared/CommunicationModal";
import { ICompanyDetailed, ICommunicationLog } from "../../types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell } from "lucide-react";
import { useApiClient } from "@/hooks/useApiClient";
import Spinner from "../shared/Spinner";
import { NotificationPanel } from "../shared/NotificationPanel";

const UserDashboard: React.FC = () => {
  const [companies, setCompanies] = useState<ICompanyDetailed[]>([]);
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [communicationMethods, setCommunicationMethods] = useState([]);
  const [isNotificationPanelOpen, setIsNotificationPanelOpen] = useState(false);

  const apiClient = useApiClient();

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const companiesResponsePromise = apiClient.get("/api/schedule/companies");
      const communicationMethodsResponsePromise = apiClient.get("/api/methods");

      const [companiesResponse, communicationMethods] = await Promise.all([
        companiesResponsePromise,
        communicationMethodsResponsePromise,
      ]);

      if (!companiesResponse.data.success) {
        setCompanies([]);
        setCommunicationMethods([]);
        throw new Error(companiesResponse.data.message);
      }

      if (!communicationMethods.data.success) {
        setCommunicationMethods([]);
        throw new Error(communicationMethods.data.message);
      }
      setCommunicationMethods(communicationMethods.data.data);
      // Process the response to include necessary fields

      setCompanies(companiesResponse.data.data);
      setLoading(false);
    } catch (err: any) {
      alert(err.message);
      setLoading(false);
    }
  };

  const handleCompanySelect = (companyId: string) => {
    setSelectedCompanies((prev) =>
      prev.includes(companyId)
        ? prev.filter((id) => id !== companyId)
        : [...prev, companyId]
    );
  };

  const handleCommunicationPerformed = async (
    communication: ICommunicationLog
  ) => {
    // TODO: Implement API call to update communication
    setCompanies((prev) =>
      prev.map((company) => {
        if (selectedCompanies.includes(company._id)) {
          return {
            ...company,
            lastFiveCommunications: [
              communication,
              ...company.lastFiveCommunications.slice(0, 4),
            ],
            isOverdue: false,
            isDueToday: false,
          };
        }
        return company;
      })
    );
    setSelectedCompanies([]);
    setIsModalOpen(false);
  };

  const getOverdueCount = () => companies.filter((c) => c.isOverdue).length;
  const getDueTodayCount = () => companies.filter((c) => c.isDueToday).length;

  if (loading) return <Spinner />;

  return (
    <div className="space-y-6 bg-white p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Company Dashboard</h1>
        <div className="flex items-center space-x-4">
          <Button
            onClick={() => setIsModalOpen(true)}
            disabled={selectedCompanies.length === 0}
          >
            Log Communication
          </Button>
          <button
            className="relative"
            onClick={() => setIsNotificationPanelOpen(true)}
          >
            <Bell className="h-6 w-6" />
            <Badge className="absolute -top-2 -right-2 px-2 py-1">
              {getOverdueCount() + getDueTodayCount()}
            </Badge>
          </button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Company Communications</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]"></TableHead>
                <TableHead>Company Name</TableHead>
                <TableHead>Last Five Communications</TableHead>
                <TableHead>Next Scheduled</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {companies.map((company) => (
                <TableRow
                  key={company._id}
                  className={
                    company.isOverdue
                      ? "bg-red-100"
                      : company.isDueToday
                      ? "bg-yellow-100"
                      : ""
                  }
                >
                  <TableCell>
                    <Checkbox
                      checked={selectedCompanies.includes(company._id)}
                      onCheckedChange={() => handleCompanySelect(company._id)}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{company.name}</TableCell>
                  <TableCell>
                    <ul className="space-y-1">
                      {company.lastFiveCommunications.map(
                        (comm: ICommunicationLog, index: number) => (
                          <li
                            key={index}
                            className="text-sm"
                            title={comm.notes ?? undefined}
                          >
                            <Badge variant="outline" className="mr-2">
                              {comm.method.name}
                            </Badge>
                            {new Date(comm.createdAt).toLocaleDateString()}
                          </li>
                        )
                      )}
                    </ul>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="mr-2">
                      {/* @ts-ignore */}
                      {company.nextScheduledCommunication.name}
                    </Badge>
                    {new Date(
                      //  @ts-ignore
                      company.nextScheduledCommunication.date
                    ).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {company.isOverdue && (
                      <Badge variant="destructive">Overdue</Badge>
                    )}
                    {company.isDueToday && (
                      <Badge variant="default" color="yellow">
                        Due Today
                      </Badge>
                    )}
                    {!company.isOverdue && !company.isDueToday && (
                      <Badge variant="secondary">On Track</Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <CommunicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCommunicationPerformed}
        communicationMethods={communicationMethods}
      />
      <NotificationPanel
        isOpen={isNotificationPanelOpen}
        onClose={() => setIsNotificationPanelOpen(false)}
        companies={companies}
      />
    </div>
  );
};

export default UserDashboard;
