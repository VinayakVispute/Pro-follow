import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Switch } from "../ui/switch";

interface CommunicationMethod {
  name: string;
  description: string;
  sequence: number;
  mandatory: boolean;
}

interface AddEditCommunicationMethodDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSubmit: (method: CommunicationMethod) => void;
  initialData?: CommunicationMethod;
}

export function AddEditCommunicationMethodDialog({
  isOpen,
  onOpenChange,
  onSubmit,
  initialData,
}: AddEditCommunicationMethodDialogProps) {
  const [method, setMethod] = useState<CommunicationMethod>({
    name: "",
    description: "",
    sequence: 1,
    mandatory: false,
  });

  useEffect(() => {
    if (initialData) {
      setMethod(initialData);
    } else {
      setMethod({
        name: "",
        description: "",
        sequence: 1,
        mandatory: false,
      });
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(method);
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-white dark:bg-gray-800">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white">
            {initialData ? "Edit" : "Add"} Communication Method
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">
              Name
            </Label>
            <Input
              id="name"
              value={method.name}
              onChange={(e) => setMethod({ ...method, name: e.target.value })}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <Label
              htmlFor="description"
              className="text-gray-700 dark:text-gray-300"
            >
              Description
            </Label>
            <Textarea
              id="description"
              value={method.description}
              onChange={(e) =>
                setMethod({ ...method, description: e.target.value })
              }
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <Label
              htmlFor="sequence"
              className="text-gray-700 dark:text-gray-300"
            >
              Sequence
            </Label>
            <Input
              id="sequence"
              type="number"
              value={method.sequence}
              onChange={(e) =>
                setMethod({ ...method, sequence: parseInt(e.target.value) })
              }
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="mandatory"
              checked={method.mandatory}
              onCheckedChange={(checked: boolean) =>
                setMethod({ ...method, mandatory: checked })
              }
            />
            <Label
              htmlFor="mandatory"
              className="text-gray-700 dark:text-gray-300"
            >
              Mandatory
            </Label>
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="text-gray-700 dark:text-gray-300"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {initialData ? "Save" : "Add"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
