import { Link, Links } from "react-router";
import {
  SignedIn,
  SignedOut,
  UserButton,
  SignInButton,
} from "@clerk/clerk-react";
import { Building2 } from "lucide-react";
import { Button } from "../ui/button";

export default function Navbar() {
  return (
    <nav className="bg-white/80 backdrop-blur-md dark:bg-gray-900/80 sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Building2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                ProFollow
              </span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/features"
                className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white px-3 py-2 text-sm font-medium"
              >
                Features
              </Link>
              <Link
                to="/pricing"
                className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white px-3 py-2 text-sm font-medium"
              >
                Pricing
              </Link>
              <Link
                to="/about"
                className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white px-3 py-2 text-sm font-medium"
              >
                About
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <SignedIn>
              <Link
                to="/dashboard"
                className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white px-3 py-2 text-sm font-medium mr-4"
              >
                Dashboard
              </Link>
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8",
                  },
                }}
              />
            </SignedIn>
            <SignedOut>
              <Link
                to="/SignIn"
                className="ml-4 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Sign In
              </Link>
              <Link
                to="/SignUp"
                className="ml-4 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Sign Up
              </Link>
            </SignedOut>
          </div>
        </div>
      </div>
    </nav>
  );
}
