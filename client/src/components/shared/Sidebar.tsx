import { useClerk, useUser } from "@clerk/clerk-react";

import {
  Bell,
  Calendar,
  FileText,
  HelpCircle,
  Home,
  LogOut,
  MessageSquare,
  PanelRight,
  User,
} from "lucide-react";
import { Link, useLocation } from "react-router";

type SidebarProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const Sidebar: React.FC<SidebarProps> = ({ open, setOpen }) => {
  const location = useLocation();
  const { user } = useUser();
  const { signOut } = useClerk();
  // Define the MenuItem type
  type MenuItem = {
    icon: React.ComponentType<{ className?: string }>;
    name: string;
    path: string;
  };
  // Determine the role and provide a fallback
  const role = (user?.publicMetadata?.role as string) || "user"; // Default to "user" if role is not present
  const isAdmin = role === "admin";

  // Menu items based on role
  const adminMenuItems: MenuItem[] = [
    { icon: Home, name: "Dashboard", path: "/Dashboard" },
    {
      icon: MessageSquare,
      name: "Communication Methods",
      path: "/CommunicationMethods",
    },
    { icon: User, name: "Profile", path: "/Profile" },
    { icon: HelpCircle, name: "Help", path: "/Help" },
  ];

  const userMenuItems: MenuItem[] = [
    { icon: Home, name: "Home", path: "/Home" },
    { icon: Calendar, name: "Calendar", path: "/Calendar" },
    { icon: Bell, name: "Notifications", path: "/Notifications" },
    { icon: FileText, name: "Logs", path: "/Logs" },
    { icon: User, name: "Profile", path: "/Profile" },
    { icon: HelpCircle, name: "Help", path: "/Help" },
  ];

  const handleSignOut = async () => {
    try {
      // Sign out and redirect to `/`
      await signOut({ redirectUrl: "/" });
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Select menu items based on role
  const menuItems = isAdmin ? adminMenuItems : userMenuItems;

  return (
    <div
      className={`${
        open ? "translate-x-0" : "-translate-x-full"
      } fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 flex flex-col`}
    >
      <div className="flex items-center justify-between border-b p-4">
        <div className="flex items-center space-x-2">
          <img
            src="https://res.cloudinary.com/dkawvablj/image/upload/v1735713425/ProFollow/s7fbw6d8fmb29mfocfe6.webp"
            alt="Logo"
            className="h-16 w-16"
          />
          <div className="flex flex-col">
            <span className="text-xl font-semibold">Pro Follow</span>
            <span className="text-xs font-thin text-gray-600">
              {isAdmin ? "Admin" : "User"} Dashboard
            </span>
          </div>
        </div>
        <button
          onClick={() => setOpen(false)}
          className="lg:hidden"
          aria-label="Close sidebar"
        >
          <PanelRight size={20} className="text-gray-600" />
        </button>
      </div>

      <nav className="flex-grow mt-5 overflow-y-auto">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center px-6 py-3 text-sm hover:bg-gray-100 transition-colors ${
              location.pathname === item.path
                ? "bg-gray-100 text-blue-600 font-medium"
                : "text-gray-600"
            }`}
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="border-t p-4">
        <button
          onClick={handleSignOut}
          className="flex items-center w-full px-6 py-3 text-gray-600 hover:bg-gray-100 transition-colors"
        >
          <LogOut className="w-5 h-5 mr-3" />
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
