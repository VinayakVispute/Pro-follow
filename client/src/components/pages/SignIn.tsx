import { SignIn, useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router";

export default function SignUpPage() {
  const navigate = useNavigate();
  const { isLoaded } = useAuth();

  if (!isLoaded) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-screen justify-center bg-white">
      <button
        onClick={() => navigate(-1)}
        className="self-start mt-4 text-blue-500 hover:underline"
      >
        ← Back
      </button>
      <div className="flex flex-col items-center w-full max-w-md p-6 justify-center bg-white">
        <SignIn
          appearance={{
            elements: {
              rootBox: "shadow-none border-none w-full",
              card: "bg-white w-full",
            },
          }}
          fallback="/auth-redirect"
          fallbackRedirectUrl="/auth-redirect"
          forceRedirectUrl="/auth-redirect"
        />
      </div>
    </div>
  );
}
