import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CompanyData } from "../../types";

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
    ],
    nextScheduledCommunication: { type: "Phone Call", date: "2023-09-10" },
    isOverdue: true,
    isDueToday: false,
  },
];

export const Notifications: React.FC = () => {
  const overdueCompanies = mockData.filter((company) => company.isOverdue);
  const dueTodayCompanies = mockData.filter((company) => company.isDueToday);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-4">Notifications</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-red-600">
              Overdue Communications
            </CardTitle>
          </CardHeader>
          <CardContent>
            {overdueCompanies.length === 0 ? (
              <p>No overdue communications</p>
            ) : (
              <ul className="space-y-2">
                {overdueCompanies.map((company) => (
                  <li
                    key={company.id}
                    className="flex justify-between items-center"
                  >
                    <span>{company.name}</span>
                    <Badge variant="destructive">
                      {company.nextScheduledCommunication.type} -{" "}
                      {new Date(
                        company.nextScheduledCommunication.date
                      ).toLocaleDateString()}
                    </Badge>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-yellow-600">Due Today</CardTitle>
          </CardHeader>
          <CardContent>
            {dueTodayCompanies.length === 0 ? (
              <p>No communications due today</p>
            ) : (
              <ul className="space-y-2">
                {dueTodayCompanies.map((company) => (
                  <li
                    key={company.id}
                    className="flex justify-between items-center"
                  >
                    <span>{company.name}</span>
                    <Badge variant="destructive">
                      {company.nextScheduledCommunication.type} -{" "}
                      {new Date(
                        company.nextScheduledCommunication.date
                      ).toLocaleDateString()}
                    </Badge>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
