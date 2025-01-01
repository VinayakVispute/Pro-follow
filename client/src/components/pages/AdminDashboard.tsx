import React, { useState } from "react";
import { Plus, Building2, MapPin, Activity } from "lucide-react";
import CompanyCard from "../shared/CompanyCard";

interface Company {
  id: number;
  name: string;
  location: string;
  status: "active" | "pending";
  linkedinProfile?: string;
  emails: string[];
  phoneNumbers: string[];
  notes?: string;
}

const AdminDashboard: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [companies, setCompanies] = useState<Company[]>([
    {
      id: 1,
      name: "Acme Corp",
      location: "New York",
      status: "active",
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
    },
    {
      id: 2,
      name: "Globex Inc",
      location: "London",
      status: "active",
      linkedinProfile: "https://www.linkedin.com/company/globex-inc",
      emails: ["contact@globexinc.com"],
      phoneNumbers: ["+44 20 1234 5678"],
    },
    {
      id: 3,
      name: "Stark Industries",
      location: "California",
      status: "pending",
      emails: ["info@stark.com", "hr@stark.com"],
      phoneNumbers: ["+1 (555) 555-5555"],
      notes: "Pending approval from legal team",
    },
  ]);
  const [formData, setFormData] = useState({ name: "", location: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCompany = {
      id: companies.length + 1,
      name: formData.name,
      location: formData.location,
      status: "pending" as const,
      emails: [],
      phoneNumbers: [],
    };
    setCompanies([...companies, newCompany]);
    setFormData({ name: "", location: "" });
    setShowForm(false);
  };

  const handleUpdateNotes = (id: number, notes: string) => {
    setCompanies(
      companies.map((company) =>
        company.id === id ? { ...company, notes } : company
      )
    );
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus className="inline-block w-4 h-4 mr-2" />
            Add Company
          </button>
        </div>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium mb-4">Add New Company</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Company Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700"
              >
                Location
              </label>
              <input
                type="text"
                id="location"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Add Company
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

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
            {companies.filter((c) => c.status === "active").length}
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
            {companies.filter((c) => c.status === "pending").length}
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {companies.map((company) => (
          <CompanyCard
            key={company.id}
            company={company}
            onUpdateNotes={handleUpdateNotes}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
