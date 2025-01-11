import "./index.css";
import { Route, Routes } from "react-router";

import AdminLayout from "./components/layout/AdminLayout";
import UserLayout from "./components/layout/UserLayout";
import AdminDashboardPage from "./components/pages/AdminDashboard";
import UserDashboardPage from "./components/pages/UserDashboard";
import CommunicationMethodsPage from "./components/pages/CommunicationMethod";
import ProfilePage from "./components/pages/Profile";
import HomePage from "./components/pages/HomePage";
import Navbar from "./components/shared/Navbar";
import SignUpPage from "./components/pages/SignUp";
import SignInPage from "./components/pages/SignIn";
import AuthRedirectLayout from "./components/layout/AuthRedirect";
import CommunicationCalendar from "./components/shared/Calendar";

function App() {
  return (
    <main className="">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <HomePage />
            </>
          }
        />
        <Route path="/SignUp" element={<SignUpPage />} />
        <Route path="/SignIn" element={<SignInPage />} />
        <Route
          path="/Dashboard"
          element={
            <AdminLayout>
              <AdminDashboardPage />
            </AdminLayout>
          }
        />
        <Route
          path="/Home"
          element={
            <UserLayout>
              <UserDashboardPage />
            </UserLayout>
          }
        />
        <Route
          path="/Calendar"
          element={
            <UserLayout>
              <CommunicationCalendar />
            </UserLayout>
          }
        />
        <Route
          path="/CommunicationMethods"
          element={
            <AdminLayout>
              <CommunicationMethodsPage />
            </AdminLayout>
          }
        />
        <Route
          path="/Profile"
          element={
            <AdminLayout>
              <ProfilePage />
            </AdminLayout>
          }
        />
        <Route path="/auth-redirect" element={<AuthRedirectLayout />} />
      </Routes>
    </main>
  );
}

export default App;
