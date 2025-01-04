import React, { useEffect, useState } from "react";
import { Building2, MapPin, Activity } from "lucide-react";
import CompanyCard from "../shared/CompanyCard";
import AddCompanyDialog from "../shared/AddCompanyDialog";
import { Button } from "../ui/button";
import Spinner from "../shared/Spinner";
import { useAuth } from "@clerk/clerk-react";
import { useApiClient } from "../../hooks/useApiClient";

interface Company {
  _id: string;
  name: string;
  location: string;
  linkedInProfile?: string;
  emails: string[];
  phoneNumbers: string[];
  notes?: string;
  communicationPeriodicity: string;
}

const AdminDashboard: React.FC = () => {
  const { isSignedIn, isLoaded } = useAuth();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const apiClient = useApiClient();
  const fetchCompanies = async () => {
    try {
      setIsLoading(true);

      // 2. Retrieve the Clerk token
      const response = await apiClient.get("/api/companies");

      if (response.data.success) {
        setCompanies(response.data.data);
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching companies:", error);
      setCompanies([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Only proceed if Clerk is loaded and user is signed in
    if (!isLoaded) return;
    if (!isSignedIn) {
      console.warn("User is not signed in.");
      return;
    }
    fetchCompanies();
    return () => {
      setCompanies([]);
    };
  }, [isLoaded, isSignedIn]);

  const handleUpdateCompany = async (
    id: string,
    updatedCompany: Partial<Company>
  ) => {
    const response = await apiClient.patch(
      `/api/companies/${id}`,
      updatedCompany
    );
    if (!response.data.success) {
      console.error("Error updating company:", response.data.message);
      return;
    }
    setCompanies(
      companies.map((company) =>
        company._id === response.data.data._id
          ? { ...company, ...updatedCompany }
          : company
      )
    );
  };

  const handleDeleteCompany = async (id: string) => {
    const response = await apiClient.delete(`/api/companies/${id}`);
    if (!response.data.success) {
      console.error("Error deleting company:", response.data.message);
      return;
    }
    setCompanies(
      companies.filter((company) => company._id !== response.data.data._id)
    );
  };
  const handleAddCompany = async (newCompany: Partial<Company>) => {
    try {
      const response = await apiClient.post("/api/companies", newCompany);
      if (!response.data.success) {
        console.error("Error adding company:", response.data.message);
        return;
      }
      setCompanies([...companies, response.data.data]);
    } catch (error) {
      console.error("Error adding company:", error);
    }
  };

  const handleUpdateNotes = (id: string, notes: string) => {
    handleUpdateCompany(id, { notes });
  };

  if (isLoading) {
    return <Spinner />;
  }

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
              handleUpdateCompany(editingCompany._id, updatedCompany);
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
            {/* {companies.filter((c) => c.status === "active").length} */}-
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
            {/* {companies.filter((c) => c.status === "pending").length} */}-
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {companies.map((company) => (
          <CompanyCard
            key={company._id}
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
