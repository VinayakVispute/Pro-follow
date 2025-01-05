import { useEffect, useState, useRef } from "react";
import { Check, ChevronsUpDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useApiClient } from "@/hooks/useApiClient";
interface User {
  _id: string;
  firstName: string;
  lastName: string;
}

interface AssignDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onAssign: (userId: string) => void;
}

export function AssignDialog({
  isOpen,
  onOpenChange,
  onAssign,
}: AssignDialogProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const apiClient = useApiClient();

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get("/api/users/user");
        if (!response.data.success) {
          throw new Error(response.data.message);
        }
        setUsers(response.data.data || []);
        setFilteredUsers(response.data.data || []);
      } catch (error) {
        console.error("Error fetching users:", error);
        setUsers([]);
        setFilteredUsers([]);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchUsers();
    }
  }, [isOpen, apiClient]);

  useEffect(() => {
    const filtered = users.filter(
      (user) =>
        user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchQuery, users]);

  const handleAssign = () => {
    if (selectedUser) {
      onAssign(selectedUser);
      handleClose();
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    setOpen(false);
    setSelectedUser("");
    setSearchQuery("");
  };

  const selectedUserName = users.find((user) => user._id === selectedUser)
    ? `${users.find((user) => user._id === selectedUser)?.firstName} ${
        users.find((user) => user._id === selectedUser)?.lastName
      }`
    : "";

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Assign Company</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between"
              >
                {selectedUserName || "Select user..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <div className="flex flex-col w-full border rounded-md bg-white">
                {/* Search Input */}
                <div className="flex items-center border-b px-3 py-2">
                  <Search className="h-4 w-4 text-gray-400" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search users..."
                    className="flex-1 ml-2 outline-none text-sm"
                  />
                </div>

                {/* Users List */}
                <div className="max-h-60 overflow-y-auto">
                  {loading ? (
                    <div className="p-2 text-sm text-gray-500">
                      Loading users...
                    </div>
                  ) : filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <div
                        key={user._id}
                        onClick={() => {
                          setSelectedUser(user._id);
                          setOpen(false);
                          setSearchQuery("");
                        }}
                        className={cn(
                          "flex items-center px-3 py-2 text-sm cursor-pointer",
                          "hover:bg-gray-100 transition-colors",
                          selectedUser === user._id && "bg-gray-100"
                        )}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            selectedUser === user._id
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        <span>
                          {user.firstName} {user.lastName}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="p-2 text-sm text-gray-500">
                      No users found
                    </div>
                  )}
                </div>
              </div>
            </PopoverContent>
          </Popover>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button onClick={handleAssign} disabled={!selectedUser}>
              Assign
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
