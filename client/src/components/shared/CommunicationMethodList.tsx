import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, MoveUp, MoveDown } from "lucide-react";

interface CommunicationMethod {
  id: string;
  name: string;
  description: string;
  sequence: number;
  mandatory: boolean;
}

interface CommunicationMethodListProps {
  methods: CommunicationMethod[];
  onEdit: (method: CommunicationMethod) => void;
  onDelete: (method: CommunicationMethod) => void;
  onMove: (id: string, direction: "up" | "down") => void;
}

export function CommunicationMethodList({
  methods,
  onEdit,
  onDelete,
  onMove,
}: CommunicationMethodListProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-gray-50 dark:bg-gray-700">
          <TableHead className="font-semibold text-gray-900 dark:text-white">
            Sequence
          </TableHead>
          <TableHead className="font-semibold text-gray-900 dark:text-white">
            Name
          </TableHead>
          <TableHead className="font-semibold text-gray-900 dark:text-white">
            Description
          </TableHead>
          <TableHead className="font-semibold text-gray-900 dark:text-white">
            Mandatory
          </TableHead>
          <TableHead className="font-semibold text-gray-900 dark:text-white">
            Actions
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {methods.map((method, index) => (
          <TableRow
            key={method.id}
            className="hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <TableCell className="font-medium text-gray-900 dark:text-white">
              {method.sequence}
            </TableCell>
            <TableCell className="text-gray-700 dark:text-gray-300">
              {method.name}
            </TableCell>
            <TableCell className="text-gray-700 dark:text-gray-300">
              {method.description}
            </TableCell>
            <TableCell className="text-gray-700 dark:text-gray-300">
              {method.mandatory ? (
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                  Yes
                </span>
              ) : (
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                  No
                </span>
              )}
            </TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(method)}
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(method)}
                  className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onMove(method.id, "up")}
                  disabled={index === 0}
                  className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <MoveUp className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onMove(method.id, "down")}
                  disabled={index === methods.length - 1}
                  className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <MoveDown className="w-4 h-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
