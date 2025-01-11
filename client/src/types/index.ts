export interface ICompany {
  _id: string;
  name: string;
  location: string;
  linkedInProfile: string | null;
  emails: string[];
  phoneNumbers: string[];
  notes?: string;
  communicationPeriodicity:
    | "weekly"
    | "biweekly"
    | "monthly"
    | "quarterly"
    | "yearly";
  assignedTo?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICommunicationLog {
  _id: string;
  company: string;
  performedBy: string;
  method: ICommunicationMethod;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICommunicationMethod {
  _id: string;
  name: string;
  description?: string;
  sequence: number;
  mandatory: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUser {
  _id: string;
  clerkId: string;
  email: string;
  firstName: string;
  lastName: string;
  profileImageUrl: string;
  role: "user" | "admin";
  createdAt: Date;
  updatedAt: Date;
}

export interface INotification {
  _id: string;
  user: string;
  company: string;
  message: string;
  status: "unread" | "read";
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICompanyDetailed extends ICompany {
  lastFiveCommunications: ICommunicationLog[];
  nextScheduledCommunication: ICommunicationLog;
  isOverdue: boolean;
  isDueToday: boolean;
}
