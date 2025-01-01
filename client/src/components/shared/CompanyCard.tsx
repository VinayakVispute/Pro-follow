import React, { useState, useRef } from "react";
import { MapPin, Linkedin, Mail, Phone } from 'lucide-react';
import Popover from "./Popover";

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

interface CompanyCardProps {
  company: Company;
  onUpdateNotes: (id: number, notes: string) => void;
}

const CompanyCard: React.FC<CompanyCardProps> = ({ company, onUpdateNotes }) => {
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [isContactsOpen, setIsContactsOpen] = useState(false);
  const viewMoreRef = useRef<HTMLButtonElement>(null);
  const editNoteRef = useRef<HTMLButtonElement>(null);

  const handleNotesUpdate = (notes: string) => {
    onUpdateNotes(company.id, notes);
    setIsNotesOpen(false);
  };

  const renderContactItem = (
    icon: React.ReactNode,
    items: string[],
    type: "email" | "phone"
  ) => {
    const displayItems = items.slice(0, 2);
    const hasMore = items.length > 2;

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
        {hasMore && (
          <button
            ref={viewMoreRef}
            onClick={() => setIsContactsOpen(true)}
            className="text-sm text-blue-600 hover:underline"
          >
            ... View More
          </button>
        )}
      </>
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-medium text-gray-900">{company.name}</h3>
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
      </div>
      <div className="mt-4 flex items-center justify-between">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            company.status === "active"
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {company.status}
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
        <div className="space-y-2">
          {company.emails.map((email, index) => (
            <p key={`email-${index}`} className="flex items-center text-sm">
              <Mail className="w-4 h-4" />
              <a href={`mailto:${email}`} className="text-blue-600 hover:underline ml-2">
                {email}
              </a>
            </p>
          ))}
          {company.phoneNumbers.map((phone, index) => (
            <p key={`phone-${index}`} className="flex items-center text-sm">
              <Phone className="w-4 h-4" />
              <a href={`tel:${phone}`} className="text-blue-600 hover:underline ml-2">
                {phone}
              </a>
            </p>
          ))}
        </div>
      </Popover>
    </div>
  );
};

export default CompanyCard;
