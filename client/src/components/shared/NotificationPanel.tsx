"use client";

import { X } from "lucide-react";
import { ICompanyDetailed } from "@/types";

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
  companies: ICompanyDetailed[];
}

export function NotificationPanel({
  isOpen,
  onClose,
  companies,
}: NotificationPanelProps) {
  if (!isOpen) return null;

  const overdueCompanies = companies.filter((c) => c.isOverdue);
  const dueTodayCompanies = companies.filter((c) => c.isDueToday);

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-transparent backdrop-blur-[1px] z-40"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="fixed right-0 top-0 h-full w-[400px] bg-white shadow-[0_0_15px_rgba(0,0,0,0.1),0_0_6px_rgba(0,0,0,0.05)] border-l border-gray-100 z-50 animate-in slide-in-from-right">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between border-b p-4">
            <h2 className="text-lg font-semibold">Notifications</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-auto p-4">
            <div className="space-y-6">
              {/* Communication Settings */}

              {/* Overdue Communications */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-900">
                  Overdue Communications
                </h3>
                <p className="text-sm text-gray-500">
                  Companies with overdue communications.
                </p>
                <div className="space-y-2">
                  {overdueCompanies.map((company) => (
                    <div
                      key={company._id}
                      className="p-3 rounded-lg border shadow-sm transition-shadow hover:shadow-md"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-red-900">
                            {company.name}
                          </p>
                          <p className="text-sm text-red-700">
                            {/* @ts-ignore */}
                            Next: {company.nextScheduledCommunication.name}
                          </p>
                        </div>
                        <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                          Overdue
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Due Today Communications */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-900">Due Today</h3>
                <p className="text-sm text-gray-500">
                  Companies with communications due today.
                </p>
                <div className="space-y-2">
                  {dueTodayCompanies.map((company) => (
                    <div
                      key={company._id}
                      className="p-3 rounded-lg border shadow-sm transition-shadow hover:shadow-md"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-yellow-900">
                            {company.name}
                          </p>
                          <p className="text-sm text-yellow-700">
                            {/* @ts-ignore */}
                            Next: {company.nextScheduledCommunication.name}
                          </p>
                        </div>
                        <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                          Due Today
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
