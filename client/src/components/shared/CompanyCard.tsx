import React, { useState, useRef } from "react";
import {
  MapPin,
  Linkedin,
  Mail,
  Phone,
  MoreVertical,
  Trash2,
  Edit,
} from "lucide-react";
import Popover from "./Popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AddCompanyDialog from "./AddCompanyDialog";

interface Company {
  _id: string;
  name: string;
  location: string;
  linkedinProfile?: string;
  emails: string[];
  phoneNumbers: string[];
  notes?: string;
  communicationPeriodicity: string;
}

interface CompanyCardProps {
  company: Company;
  onUpdateNotes: (_id: string, notes: string) => void;
  onDeleteCompany: (_id: string) => void;
  onUpdateCompany: (_id: string, updatedCompany: Partial<Company>) => void;
}

const CompanyCard: React.FC<CompanyCardProps> = ({
  company,
  onUpdateNotes,
  onDeleteCompany,
  onUpdateCompany,
}) => {
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [isContactsOpen, setIsContactsOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const viewMoreRef = useRef<HTMLButtonElement>(null);
  const editNoteRef = useRef<HTMLButtonElement>(null);
  const isRemainingContacts =
    company.emails.length > 2 || company.phoneNumbers.length > 2;

  const handleNotesUpdate = (notes: string) => {
    onUpdateNotes(company._id, notes);
    setIsNotesOpen(false);
  };

  const handleDelete = () => {
    onDeleteCompany(company._id);
    setIsDeleteDialogOpen(false);
  };

  const handleUpdateCompany = (updatedCompany: Partial<Company>) => {
    onUpdateCompany(company._id, updatedCompany);
    setIsEditDialogOpen(false);
  };

  const renderContactItem = (
    icon: React.ReactNode,
    items: string[],
    type: "email" | "phone"
  ) => {
    const displayItems = items.slice(0, 2);

    return (
      <>
        {displayItems.map((item, index) => (
          <p key={index} className="flex items-center text-sm text-gray-500">
            {icon}
            <a
              href={type === "email" ? `mailto:${item}` : `tel:${item}`}
              className="text-blue-600 hover:underline ml-2"
            >
              {item}
            </a>
          </p>
        ))}
        {displayItems.length < 2 && (
          <p className="flex items-center text-sm text-gray-300">
            {icon}
            <span className="ml-2">-</span>
          </p>
        )}
      </>
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex flex-row justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">{company.name}</h3>
        <DropdownMenu>
          <DropdownMenuTrigger className="h-8 w-8 flex items-center justify-center rounded-md hover:bg-gray-100">
            <MoreVertical className="w-4 h-4 text-gray-600" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => setIsEditDialogOpen(true)}
              className="flex items-center gap-2 cursor-pointer"
            >
              <Edit className="w-4 h-4" />
              <span>Edit</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setIsDeleteDialogOpen(true)}
              className="flex items-center gap-2 cursor-pointer text-red-600 focus:text-red-600"
            >
              <Trash2 className="w-4 h-4" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="mt-2 space-y-2">
        <p className="flex items-center text-sm text-gray-500">
          <MapPin className="w-4 h-4" />
          <span className="ml-2">{company.location}</span>
        </p>
        <p className="flex items-center text-sm text-gray-500">
          <Linkedin className="w-4 h-4" />
          {company.linkedinProfile ? (
            <a
              href={company.linkedinProfile}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline ml-2"
            >
              LinkedIn Profile
            </a>
          ) : (
            <span className="text-gray-300 ml-2">-</span>
          )}
        </p>
        {renderContactItem(
          <Mail className="w-4 h-4" />,
          company.emails,
          "email"
        )}
        {renderContactItem(
          <Phone className="w-4 h-4" />,
          company.phoneNumbers,
          "phone"
        )}
        <button
          ref={viewMoreRef}
          onClick={() => setIsContactsOpen(true)}
          className={`text-sm ${
            isRemainingContacts
              ? "text-blue-600 hover:underline cursor-pointer"
              : "text-gray-500 cursor-auto"
          }`}
          disabled={!isRemainingContacts}
        >
          ... View More
        </button>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          {company.communicationPeriodicity}
        </span>
        <button
          ref={editNoteRef}
          onClick={() => setIsNotesOpen(true)}
          className="px-3 py-1 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-md"
        >
          {company.notes ? "Edit Note" : "Add Note"}
        </button>
      </div>

      <Popover
        isOpen={isNotesOpen}
        setIsOpen={setIsNotesOpen}
        initialNote={company.notes}
        onSubmit={handleNotesUpdate}
        triggerRef={editNoteRef}
      />

      <Popover
        isOpen={isContactsOpen}
        setIsOpen={setIsContactsOpen}
        initialNote=""
        onSubmit={() => {}}
        triggerRef={viewMoreRef}
      >
        <ScrollArea className="space-y-2 h-[200px]">
          {company.emails.map((email, index) => (
            <p key={`email-${index}`} className="flex items-center text-sm">
              <Mail className="w-4 h-4" />
              <a
                href={`mailto:${email}`}
                className="text-blue-600 hover:underline ml-2"
              >
                {email}
              </a>
            </p>
          ))}
          {company.phoneNumbers.map((phone, index) => (
            <p key={`phone-${index}`} className="flex items-center text-sm">
              <Phone className="w-4 h-4" />
              <a
                href={`tel:${phone}`}
                className="text-blue-600 hover:underline ml-2"
              >
                {phone}
              </a>
            </p>
          ))}
        </ScrollArea>
      </Popover>

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this company?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              company and remove all associated data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AddCompanyDialog
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onAddCompany={handleUpdateCompany}
        initialData={company}
        mode="edit"
      />
    </div>
  );
};

export default CompanyCard;
