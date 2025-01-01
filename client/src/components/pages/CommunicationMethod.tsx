import { useState } from "react";
import { MessageSquare, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { CommunicationMethodList } from "../shared/CommunicationMethodList";
import { AddEditCommunicationMethodDialog } from "../shared/AddEditCommunicationMethodDialog";
import { DeleteConfirmationDialog } from "../shared/DeleteConfirmationDialog";

interface CommunicationMethod {
  id: string;
  name: string;
  description: string;
  sequence: number;
  mandatory: boolean;
}

const defaultMethods: CommunicationMethod[] = [
  {
    id: "1",
    name: "LinkedIn Post",
    description: "Post on LinkedIn",
    sequence: 1,
    mandatory: false,
  },
  {
    id: "2",
    name: "LinkedIn Message",
    description: "Direct LinkedIn message",
    sequence: 2,
    mandatory: true,
  },
  {
    id: "3",
    name: "Email",
    description: "Send an email",
    sequence: 3,
    mandatory: true,
  },
  {
    id: "4",
    name: "Phone Call",
    description: "Call the company",
    sequence: 4,
    mandatory: false,
  },
  {
    id: "5",
    name: "Other",
    description: "Custom communication",
    sequence: 5,
    mandatory: false,
  },
];

export default function CommunicationMethodsPage() {
  const [methods, setMethods] = useState<CommunicationMethod[]>(defaultMethods);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingMethod, setEditingMethod] =
    useState<CommunicationMethod | null>(null);
  const [deletingMethod, setDeletingMethod] =
    useState<CommunicationMethod | null>(null);

  const handleAddMethod = (newMethod: Omit<CommunicationMethod, "id">) => {
    const id = Date.now().toString();
    setMethods([...methods, { ...newMethod, id }]);
  };

  const handleUpdateMethod = (updatedMethod: CommunicationMethod) => {
    setMethods(
      methods.map((method) =>
        method.id === updatedMethod.id ? updatedMethod : method
      )
    );
  };

  const handleDeleteMethod = (id: string) => {
    setMethods(methods.filter((method) => method.id !== id));
  };

  const handleMoveMethod = (id: string, direction: "up" | "down") => {
    const index = methods.findIndex((method) => method.id === id);
    if (
      (direction === "up" && index > 0) ||
      (direction === "down" && index < methods.length - 1)
    ) {
      const newMethods = [...methods];
      const [movedMethod] = newMethods.splice(index, 1);
      newMethods.splice(
        direction === "up" ? index - 1 : index + 1,
        0,
        movedMethod
      );
      setMethods(
        newMethods.map((method, i) => ({ ...method, sequence: i + 1 }))
      );
    }
  };

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
