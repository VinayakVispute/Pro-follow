import React, { useEffect, useRef } from "react";
import { Menu, Search, Bell } from "lucide-react";

import ProfileInfo from "./ProfileCard";

interface NavbarProps {
  onMenuButtonClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuButtonClick }) => {
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "k") {
        event.preventDefault(); // Prevent the default browser action
        searchInputRef.current?.focus(); // Focus the search input
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <header className="bg-white shadow-sm">
      <div className="flex items-center justify-between h-16 px-4">
        <button
          onClick={onMenuButtonClick}
          className="text-gray-500 hover:text-gray-700 lg:hidden"
        >
          <Menu size={24} />
        </button>
        <div className="flex items-center space-x-4">
          <ProfileInfo />
        </div>
        <div className="flex-1 items-center px-4 space-x-4">
          <div className="relative max-w-xl">
            <input
              type="text"
              placeholder="Search..."
              ref={searchInputRef} // Attach the ref to the input
              className="w-full py-2 pl-10 pr-4 text-gray-700 bg-gray-100 rounded-full focus:outline-none"
            />
            <Search
              className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-2">
              <kbd className="inline-flex h-10 w-10 max-h-full items-center font-[inherit] font-thin text-gray-600">
                <span className="text-xl">⌘</span>K
              </kbd>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-gray-500 hover:text-gray-700">
            <Bell size={24} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
