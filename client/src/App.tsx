import "./index.css";
import { Route, Routes } from "react-router";

import AdminLayout from "./components/layout/AdminLayout";
import AdminDashboardPage from "./components/pages/AdminDashboard";
import CommunicationMethodsPage from "./components/pages/CommunicationMethod";
import ProfilePage from "./components/pages/Profile";
import HomePage from "./components/pages/HomePage";
import Navbar from "./components/shared/Navbar";
import SignUpPage from "./components/pages/SignUp";
import SignInPage from "./components/pages/SignIn";
import AuthRedirectLayout from "./components/layout/AuthRedirect";

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
