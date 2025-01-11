import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useUser } from "@clerk/clerk-react";

const ProfileInfo: React.FC = () => {
  const { isSignedIn, user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-12 w-12">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!isSignedIn) {
    return <div>Please sign in to view your profile.</div>;
  }

  const { imageUrl, fullName, emailAddresses } = user;
  console.log(user);

  return (
    <div className="flex items-center space-x-4">
      <Avatar className="h-12 w-12">
        <AvatarImage src={imageUrl} alt={fullName || "User Profile Name"} />
        <AvatarFallback>
          {(fullName || "")
            .split(" ")
            .map((n: string) => n[0])
            .join("")
            .toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <span className="text-sm font-medium text-gray-900">{fullName}</span>
        <span className="text-xs text-gray-500">
          {emailAddresses[0].emailAddress || "N/A"}
        </span>
      </div>
    </div>
  );
};

export default ProfileInfo;
