import React from "react";
import { Link, useLocation } from "react-router";
import {
  Home,
  User,
  HelpCircle,
  LogOut,
  PanelRight,
  MessageSquare,
} from "lucide-react";

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, setOpen }) => {
  const location = useLocation();

  const menuItems = [
    { icon: Home, name: "Dashboard", path: "/Dashboard" },
    {
      icon: MessageSquare,
      name: "Communication Methods",
      path: "/CommunicationMethods",
    },
    { icon: User, name: "Profile", path: "/Profile" },
    { icon: HelpCircle, name: "Help", path: "/Help" },
  ];

  const handleSignOut = () => {
    // Implement sign out logic here
    console.log("Signing out...");
  };

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
              Admin Dashboard
            </span>
          </div>
        </div>
        <button onClick={() => setOpen(false)} className="lg:hidden">
          <PanelRight size={20} className="text-gray-600" />
        </button>
      </div>
      <nav className="flex-grow mt-5">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center px-6 py-3 text-sm text-gray-600 hover:bg-gray-100 ${
              location.pathname === item.path ? "bg-gray-100" : ""
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
          className="flex items-center w-full px-6 py-3 text-gray-600 hover:bg-gray-100"
        >
          <LogOut className="w-5 h-5 mr-3" />
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
