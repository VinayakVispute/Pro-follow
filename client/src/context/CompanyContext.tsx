import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { Company } from "../components/pages/AdminDashboard";
import { useApiClient } from "@/hooks/useApiClient";
import { useAuth } from "@clerk/clerk-react";
import Spinner from "@/components/shared/Spinner";

interface CompanyContextType {
  companies: Company[];
  fetchCompanies: () => Promise<void>;
  debounceSearch: (query: string) => void;
  handleAddCompany: (company: Partial<Company>) => void;
  handleUpdateCompany: (id: string, updatedCompany: Partial<Company>) => void;
  handleDeleteCompany: (id: string) => void;
  handleUpdateNotes: (id: string, notes: string) => void;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isSearchLoading: boolean;
}

const CompanyContext = createContext<CompanyContextType | undefined>(undefined);

export const CompanyProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSearchLoading, setIsSearchLoading] = useState<boolean>(false);
  const apiClient = useApiClient();
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { isLoaded, isSignedIn } = useAuth();
  const lastSearchQuery = useRef<string>("");

  console.log("CompanyProvider: Rendering...");

  const fetchCompanies = useCallback(async () => {
    console.log("fetchCompanies: Starting fetch...");
    try {
      setIsLoading(true);
      const response = await apiClient.get("/api/companies");

      if (response.data.success) {
        console.log(
          "fetchCompanies: Successfully fetched companies:",
          response.data.data
        );
        setCompanies(response.data.data);
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error("fetchCompanies: Error fetching companies:", error);
      setCompanies([]);
    } finally {
      setIsLoading(false);
      console.log("fetchCompanies: Fetch completed.");
    }
  }, [apiClient]);

  const debounceSearch = useCallback(
    (query: string) => {
      console.log("debounceSearch: Received query:", query);

      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }

      if (query === lastSearchQuery.current) {
        console.log("debounceSearch: Query unchanged, skipping search.");
        return;
      }

      lastSearchQuery.current = query;

      searchTimeoutRef.current = setTimeout(async () => {
        if (query.trim() === "") {
          console.log(
            "debounceSearch: Query is empty. Fetching all companies..."
          );
          await fetchCompanies();
          return;
        }

        console.log(
          "debounceSearch: Searching for companies with query:",
          query
        );
        setIsSearchLoading(true);
        try {
          const response = await apiClient.get(`/api/companies/search`, {
            params: { query },
          });
          setCompanies(response.data.data ?? []);
        } catch (error) {
          console.error("debounceSearch: Error during search:", error);
        } finally {
          setIsSearchLoading(false);
        }
      }, 500);
    },
    [fetchCompanies, apiClient]
  );

  // Initial fetch and cleanup
  useEffect(() => {
    console.log("useEffect: Checking if user is loaded and signed in...");
    if (!isLoaded || !isSignedIn) {
      console.log(
        "useEffect: User is not loaded or signed in. Skipping fetch."
      );
      return;
    }

    console.log(
      "useEffect: User is loaded and signed in. Fetching companies..."
    );
    fetchCompanies();

    return () => {
      console.log("useEffect: Cleaning up...");
      setCompanies([]);
    };
  }, [isLoaded, isSignedIn, fetchCompanies]);

  const handleAddCompany = async (newCompany: Partial<Company>) => {
    console.log("handleAddCompany: Adding company:", newCompany);
    try {
      const response = await apiClient.post("/api/companies", newCompany);

      if (!response.data.success) {
        console.error(
          "handleAddCompany: Error adding company:",
          response.data.message
        );
        return;
      }

      console.log(
        "handleAddCompany: Successfully added company:",
        response.data.data
      );
      setCompanies((prevCompanies) => [...prevCompanies, response.data.data]);
    } catch (error) {
      console.error("handleAddCompany: Error adding company:", error);
    }
  };

  const handleUpdateCompany = async (
    id: string,
    updatedCompany: Partial<Company>
  ) => {
    console.log(
      "handleUpdateCompany: Updating company ID:",
      id,
      "with data:",
      updatedCompany
    );
    try {
      const response = await apiClient.patch(
        `/api/companies/${id}`,
        updatedCompany
      );

      if (!response.data.success) {
        console.error(
          "handleUpdateCompany: Error updating company:",
          response.data.message
        );
        return;
      }

      console.log(
        "handleUpdateCompany: Successfully updated company:",
        response.data.data
      );
      setCompanies((prevCompanies) =>
        prevCompanies.map((company) =>
          company._id === id ? { ...company, ...updatedCompany } : company
        )
      );
    } catch (error) {
      console.error("handleUpdateCompany: Error updating company:", error);
    }
  };

  const handleDeleteCompany = async (id: string) => {
    console.log("handleDeleteCompany: Deleting company ID:", id);
    try {
      const response = await apiClient.delete(`/api/companies/${id}`);

      if (!response.data.success) {
        console.error(
          "handleDeleteCompany: Error deleting company:",
          response.data.message
        );
        return;
      }

      console.log("handleDeleteCompany: Successfully deleted company.");
      setCompanies((prevCompanies) =>
        prevCompanies.filter((company) => company._id !== id)
      );
    } catch (error) {
      console.error("handleDeleteCompany: Error deleting company:", error);
    }
  };

  const handleUpdateNotes = (id: string, notes: string) => {
    console.log(
      "handleUpdateNotes: Updating notes for company ID:",
      id,
      "Notes:",
      notes
    );
    handleUpdateCompany(id, { notes });
  };

  if (isLoading) {
    console.log("CompanyProvider: Showing loading spinner...");
    return <Spinner />;
  }

  return (
    <CompanyContext.Provider
      value={{
        companies,
        handleAddCompany,
        handleUpdateCompany,
        handleDeleteCompany,
        handleUpdateNotes,
        isLoading,
        setIsLoading,
        isSearchLoading,
        debounceSearch,
        fetchCompanies,
      }}
    >
      {isLoading ? <Spinner /> : children}
    </CompanyContext.Provider>
  );
};

export const useCompanyContext = (): CompanyContextType => {
  const context = useContext(CompanyContext);

  if (!context) {
    throw new Error("useCompanyContext must be used within a CompanyProvider");
  }

  return context;
};
