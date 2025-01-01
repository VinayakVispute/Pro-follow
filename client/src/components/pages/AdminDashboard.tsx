import React, { useState } from "react";
import { Building2, MapPin, Activity } from "lucide-react";
import CompanyCard from "../shared/CompanyCard";
import AddCompanyDialog from "../shared/AddCompanyDialog";
import { Button } from "../ui/button";

interface Company {
  id: number;
  name: string;
  location: string;
  linkedinProfile?: string;
  emails: string[];
  phoneNumbers: string[];
  notes?: string;
  communicationPeriodicity: string;
}

const AdminDashboard: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([
    {
      id: 1,
      name: "Acme Corp",
      location: "New York",
      linkedinProfile: "https://www.linkedin.com/company/acme-corp",
      emails: [
        "info@acmecorp.com",
        "support@acmecorp.com",
        "info@acmecorp.com",
        "support@acmecorp.com",
        "info@acmecorp.com",
        "support@acmecorp.com",
      ],
      phoneNumbers: [
        "+1 (555) 123-4567",
        "+1 (555) 987-6543",
        "+1 (555) 123-4567",
        "+1 (555) 987-6543",
        "+1 (555) 123-4567",
        "+1 (555) 987-6543",
        "+1 (555) 123-4567",
        "+1 (555) 987-6543",
        "+1 (555) 123-4567",
        "+1 (555) 987-6543",
        "+1 (555) 123-4567",
        "+1 (555) 987-6543",
      ],
      notes: "Great potential for partnership",
      communicationPeriodicity: "monthly",
    },
    {
      id: 2,
      name: "Globex Inc",
      location: "London",
      linkedinProfile: "https://www.linkedin.com/company/globex-inc",
      emails: ["contact@globexinc.com"],
      phoneNumbers: ["+44 20 1234 5678"],
      notes: "Great potential for partnership",
      communicationPeriodicity: "monthly",
    },
    {
      id: 3,
      name: "Stark Industries",
      location: "California",
      emails: ["info@stark.com", "hr@stark.com"],
      phoneNumbers: ["+1 (555) 555-5555"],
      notes: "Pending approval from legal team",
      communicationPeriodicity: "monthly",
    },
  ]);

  const [editingCompany, setEditingCompany] = useState<Company | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const handleUpdateCompany = (
    id: number,
    updatedCompany: Partial<Company>
  ) => {
    setCompanies(
      companies.map((company) =>
        company.id === id ? { ...company, ...updatedCompany } : company
      )
    );
  };

  const handleDeleteCompany = (id: number) => {
    setCompanies(companies.filter((company) => company.id !== id));
  };
  const handleAddCompany = (newCompany: Partial<Company>) => {
    const companyWithId = {
      ...newCompany,
      id: Date.now(), // Use a timestamp as a simple unique id
    } as Company;
    setCompanies([...companies, companyWithId]);
  };
  const handleUpdateNotes = (id: number, notes: string) => {
    handleUpdateCompany(id, { notes });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 w-full">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <Button
            onClick={() => setIsAddDialogOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 ml-auto flex items-center"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              ></path>
            </svg>
            Add Company
          </Button>
        </div>
        <AddCompanyDialog
          onAddCompany={handleAddCompany}
          isOpen={isAddDialogOpen}
          onOpenChange={setIsAddDialogOpen}
          mode="add"
          initialData={null}
        />
        <AddCompanyDialog
          onAddCompany={(updatedCompany) => {
            if (editingCompany) {
              handleUpdateCompany(editingCompany.id, updatedCompany);
              setEditingCompany(null);
            }
          }}
          isOpen={!!editingCompany}
          onOpenChange={(isOpen) => {
            if (!isOpen) setEditingCompany(null);
          }}
          initialData={editingCompany}
          mode="edit"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">
              Total Companies
            </h2>
            <Building2 className="w-8 h-8 text-blue-500" />
          </div>
          <p className="mt-2 text-3xl font-bold text-gray-900">
            {companies.length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">
              Active Companies
            </h2>
            <Activity className="w-8 h-8 text-green-500" />
          </div>
          <p className="mt-2 text-3xl font-bold text-gray-900">
            {/* {companies.filter((c) => c.status === "active").length} */}0
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">
              Pending Companies
            </h2>
            <MapPin className="w-8 h-8 text-yellow-500" />
          </div>
          <p className="mt-2 text-3xl font-bold text-gray-900">
            {/* {companies.filter((c) => c.status === "pending").length} */}0
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {companies.map((company) => (
          <CompanyCard
            key={company.id}
            company={company}
            onUpdateNotes={handleUpdateNotes}
            onDeleteCompany={handleDeleteCompany}
            onUpdateCompany={handleUpdateCompany}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
