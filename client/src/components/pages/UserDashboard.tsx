import React, { useState } from "react";
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
import { CompanyData, Communication } from "../../types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const mockData: CompanyData[] = [
  {
    id: "1",
    name: "Tech Solutions Inc.",
    lastFiveCommunications: [
      {
        type: "LinkedIn Post",
        date: "2023-09-05",
        notes: "Shared company update",
      },
      { type: "Email", date: "2023-08-20", notes: "Followed up on proposal" },
      {
        type: "Phone Call",
        date: "2023-08-10",
        notes: "Discussed partnership opportunities",
      },
      {
        type: "LinkedIn Message",
        date: "2023-07-25",
        notes: "Introduced new product line",
      },
      { type: "Email", date: "2023-07-15", notes: "Sent initial proposal" },
    ],
    nextScheduledCommunication: { type: "LinkedIn Post", date: "2023-09-15" },
    isOverdue: false,
    isDueToday: true,
  },
  {
    id: "2",
    name: "Global Innovations Ltd.",
    lastFiveCommunications: [
      { type: "Email", date: "2023-09-01", notes: "Sent follow-up on meeting" },
      {
        type: "LinkedIn Message",
        date: "2023-08-15",
        notes: "Shared industry report",
      },
      { type: "Phone Call", date: "2023-08-05", notes: "Quarterly check-in" },
      {
        type: "Email",
        date: "2023-07-20",
        notes: "Introduced new team member",
      },
      {
        type: "LinkedIn Post",
        date: "2023-07-10",
        notes: "Commented on company update",
      },
    ],
    nextScheduledCommunication: { type: "Phone Call", date: "2023-09-10" },
    isOverdue: true,
    isDueToday: false,
  },
];

const Dashboard: React.FC = () => {
  const [companies, setCompanies] = useState<CompanyData[]>(mockData);
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCompanySelect = (companyId: string) => {
    setSelectedCompanies((prev) =>
      prev.includes(companyId)
        ? prev.filter((id) => id !== companyId)
        : [...prev, companyId]
    );
  };

  const handleCommunicationPerformed = (communication: Communication) => {
    setCompanies((prev) =>
      prev.map((company) => {
        if (selectedCompanies.includes(company.id)) {
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

  return (
    <div className="space-y-6 bg-white">
      <div className="flex justify-between items-center">
        <Button
          onClick={() => setIsModalOpen(true)}
          disabled={selectedCompanies.length === 0}
        >
          Log Communication
        </Button>
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
                <TableRow key={company.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedCompanies.includes(company.id)}
                      onCheckedChange={() => handleCompanySelect(company.id)}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{company.name}</TableCell>
                  <TableCell>
                    <ul className="space-y-1">
                      {company.lastFiveCommunications.map((comm, index) => (
                        <li key={index} className="text-sm" title={comm.notes}>
                          <Badge variant="outline" className="mr-2">
                            {comm.type}
                          </Badge>
                          {new Date(comm.date).toLocaleDateString()}
                        </li>
                      ))}
                    </ul>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="mr-2">
                      {company.nextScheduledCommunication.type}
                    </Badge>
                    {new Date(
                      company.nextScheduledCommunication.date
                    ).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {company.isOverdue && (
                      <Badge variant="destructive">Overdue</Badge>
                    )}
                    {company.isDueToday && (
                      <Badge variant="destructive">Due Today</Badge>
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
      />
    </div>
  );
};

export default Dashboard;
