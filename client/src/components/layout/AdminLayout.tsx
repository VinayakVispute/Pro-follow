import React, { useState } from "react";
import Sidebar from "../shared/Sidebar";
import Navbar from "../shared/AdminNavbar";
import { CompanyProvider } from "@/context/CompanyContext";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <CompanyProvider>
      <div className="flex h-screen bg-gray-100">
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        <div className="flex flex-col flex-1 overflow-hidden">
          <Navbar onMenuButtonClick={() => setSidebarOpen(true)} />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
            {children}
          </main>
        </div>
      </div>
    </CompanyProvider>
  );
};

export default Layout;
