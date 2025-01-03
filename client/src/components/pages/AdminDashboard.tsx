import React, { useEffect, useState } from "react";
import { Building2, MapPin, Activity } from "lucide-react";
import CompanyCard from "../shared/CompanyCard";
import AddCompanyDialog from "../shared/AddCompanyDialog";
import { Button } from "../ui/button";
import axios from "axios";
import Spinner from "../shared/Spinner";
import { useAuth } from "@clerk/clerk-react";

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
  const BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;
  const { isSignedIn, getToken, isLoaded } = useAuth();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const fetchCompanies = async () => {
    try {
      setIsLoading(true);

      // 2. Retrieve the Clerk token
      const token = await getToken();
      if (!token) {
        console.warn("No token found.");
        return;
      }

      // 3. Make the request with the Authorization header
      const response = await axios.get(`${BASE_URL}/api/companies`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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
