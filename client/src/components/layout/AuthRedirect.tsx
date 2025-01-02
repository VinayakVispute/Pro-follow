import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const AuthRedirect = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const role = user.publicMetadata.role; // Assuming role is stored in `publicMetadata`
      if (role === "admin") {
        navigate("/Dashboard");
      } else {
        navigate("/Home");
      }
    }
  }, [user, navigate]);

  return null; // Return nothing while redirection happens
};

export default AuthRedirect;
