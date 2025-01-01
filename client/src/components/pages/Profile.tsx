import { UserProfile } from "@clerk/clerk-react";

export default function ProfilePage() {
  return (
    <div className="container mx-auto py-10  min-h-screen min-w-screen dark:bg-gray-800 flex justify-center items-center overflow-hidden pl-16">
      <UserProfile
        appearance={{
          elements: {
            rootBox: "w-full",
            card: "shadow-none",
            navbar: "hidden",
            pageScrollBox: "p-8",
          },
        }}
      />
    </div>
  );
}
