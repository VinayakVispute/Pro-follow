"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Building2, X } from "lucide-react";

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

interface AddCompanyDialogProps {
  onAddCompany: (company: Partial<Company>) => void;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  initialData: Company | null;
  mode: "add" | "edit";
}

export default function AddCompanyDialog({
  onAddCompany,
  isOpen,
  onOpenChange,
  initialData,
  mode,
}: AddCompanyDialogProps) {
  const [formData, setFormData] = useState<Partial<Company>>({
    name: "",
    location: "",
    linkedInProfile: "",
    emails: [""],
    phoneNumbers: [""],
    communicationPeriodicity: "monthly",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (initialData && mode === "edit") {
      setFormData(initialData);
    } else {
      setFormData({
        name: "",
        location: "",
        linkedInProfile: "",
        emails: [""],
        phoneNumbers: [""],
        communicationPeriodicity: "monthly",
      });
    }
  }, [initialData, mode, isOpen]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleArrayInputChange = (
    index: number,
    field: "emails" | "phoneNumbers",
    value: string
  ) => {
    const newArray = [...(formData[field] as string[])];
    newArray[index] = value;
    setFormData({ ...formData, [field]: newArray });
  };

  const addArrayField = (field: "emails" | "phoneNumbers") => {
    setFormData({
      ...formData,
      [field]: [...(formData[field] as string[]), ""],
    });
  };

  const removeArrayField = (
    index: number,
    field: "emails" | "phoneNumbers"
  ) => {
    const newArray = (formData[field] as string[]).filter(
      (_, i) => i !== index
    );
    setFormData({ ...formData, [field]: newArray });
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name?.trim()) newErrors.name = "Name is required";
    if (!formData.emails?.length || !formData.emails[0].trim())
      newErrors.emails = "At least one email is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onAddCompany(formData);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Building2 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <DialogTitle className="text-xl">
                {mode === "edit" ? "Edit Company" : "Add a New Company"}
              </DialogTitle>
              <DialogDescription>
                {mode === "edit"
                  ? "Update the company details below"
                  : "Enter the company details below. Required fields are marked with *"}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Enter company name"
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Enter location"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="linkedInProfile">LinkedIn Profile</Label>
            <Input
              id="linkedInProfile"
              name="linkedInProfile"
              value={formData.linkedInProfile}
              onChange={handleInputChange}
              placeholder="https://www.linkedin.com/company/..."
            />
          </div>

          <div className="space-y-2">
            <Label>Emails *</Label>
            <div className="space-y-2">
              {formData.emails?.map((email, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    value={email}
                    onChange={(e) =>
                      handleArrayInputChange(index, "emails", e.target.value)
                    }
                    required={index === 0}
                    placeholder="email@company.com"
                  />
                  {index > 0 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeArrayField(index, "emails")}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => addArrayField("emails")}
              className="mt-2"
            >
              Add Email
            </Button>
            {errors.emails && (
              <p className="text-sm text-red-500">{errors.emails}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Phone Numbers</Label>
            <div className="space-y-2">
              {formData.phoneNumbers?.map((phone, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    value={phone}
                    onChange={(e) =>
                      handleArrayInputChange(
                        index,
                        "phoneNumbers",
                        e.target.value
                      )
                    }
                    placeholder="+1 (555) 000-0000"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeArrayField(index, "phoneNumbers")}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => addArrayField("phoneNumbers")}
              className="mt-2"
            >
              Add Phone Number
            </Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="communicationPeriodicity">
              Communication Periodicity
            </Label>
            <Select
              value={formData.communicationPeriodicity}
              onValueChange={(value) =>
                setFormData({ ...formData, communicationPeriodicity: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="biweekly">Biweekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">
              {mode === "edit" ? "Save Changes" : "Add Company"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
