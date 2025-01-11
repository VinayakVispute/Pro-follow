import { useState, useEffect } from "react";
import { MessageSquare, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { CommunicationMethodList } from "../shared/CommunicationMethodList";
import { AddEditCommunicationMethodDialog } from "../shared/AddEditCommunicationMethodDialog";
import { DeleteConfirmationDialog } from "../shared/DeleteConfirmationDialog";
import { useApiClient } from "@/hooks/useApiClient";
import Spinner from "../shared/Spinner";

interface CommunicationMethod {
  id: string;
  name: string;
  description: string;
  sequence: number;
  mandatory: boolean;
}

export default function CommunicationMethodsPage() {
  const [methods, setMethods] = useState<CommunicationMethod[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingMethod, setEditingMethod] =
    useState<CommunicationMethod | null>(null);
  const [deletingMethod, setDeletingMethod] =
    useState<CommunicationMethod | null>(null);

  const apiClient = useApiClient();

  useEffect(() => {
    fetchMethods();
  }, []);

  const fetchMethods = async () => {
    try {
      const response = await apiClient.get("/api/methods");
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      setMethods(response.data.data);
    } catch (err: any) {
      console.log("This is error", err);
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddMethod = async (
    newMethod: Omit<CommunicationMethod, "id">
  ) => {
    try {
      const response = await apiClient.post("/api/methods", newMethod);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      setMethods([...methods, response.data.data]);
    } catch (err: any) {
      console.log("This is error", err);
      throw new Error(err);
    }
  };

  const handleUpdateMethod = async (updatedMethod: CommunicationMethod) => {
    try {
      const response = await apiClient.put(
        `/api/methods/${updatedMethod.id}`,
        updatedMethod
      );
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      setMethods(
        methods.map((method) =>
          method.id === updatedMethod.id ? response.data.data : method
        )
      );
    } catch (err: any) {
      console.log("This is error", err);
      throw new Error(err);
    }
  };

  const handleDeleteMethod = async (id: string) => {
    try {
      const response = await apiClient.delete(`/api/methods/${id}`);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      setMethods(methods.filter((method) => method.id !== id));
    } catch (err: any) {
      console.log("This is error", err);
      throw new Error(err);
    }
  };

  const handleMoveMethod = async (id: string, direction: "up" | "down") => {
    try {
      const response = await apiClient.put(`/api/methods/move/${id}`, {
        direction,
      });
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      setMethods(response.data.data);
    } catch (err: any) {
      console.log("This is error", err);
      throw new Error(err);
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <MessageSquare className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Communication Methods
              </h1>
            </div>
            <Button
              onClick={() => setIsAddDialogOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Method
            </Button>
          </div>

          <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
            <CommunicationMethodList
              methods={methods}
              onEdit={setEditingMethod}
              onDelete={setDeletingMethod}
              onMove={handleMoveMethod}
            />
          </div>
        </div>
      </div>

      <AddEditCommunicationMethodDialog
        isOpen={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onSubmit={handleAddMethod}
      />

      {editingMethod && (
        <AddEditCommunicationMethodDialog
          isOpen={!!editingMethod}
          onOpenChange={(isOpen) => {
            if (!isOpen) setEditingMethod(null);
          }}
          onSubmit={(updatedMethod) => {
            handleUpdateMethod({ ...updatedMethod, id: editingMethod.id });
            setEditingMethod(null);
          }}
          initialData={editingMethod}
        />
      )}

      {deletingMethod && (
        <DeleteConfirmationDialog
          isOpen={!!deletingMethod}
          onOpenChange={(isOpen) => {
            if (!isOpen) setDeletingMethod(null);
          }}
          onConfirm={() => {
            handleDeleteMethod(deletingMethod.id);
            setDeletingMethod(null);
          }}
          title="Delete Communication Method"
          description={`Are you sure you want to delete the "${deletingMethod.name}" communication method?`}
        />
      )}
    </div>
  );
}
