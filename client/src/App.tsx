import "./index.css";
import { Route, Routes } from "react-router";

import AdminLayout from "./components/layout/AdminLayout";
import AdminDashboardPage from "./components/pages/AdminDashboard";
import CommunicationMethodsPage from "./components/pages/CommunicationMethod";
import ProfilePage from "./components/pages/Profile";

function App() {
  return (
    <div className="min-h-screen bg-background antialiased">
      <main className="relative flex min-h-screen flex-col">
        <div className="flex-1">
          <Routes>
            <Route
              path="/"
              element={
                <div className="container flex-1 p-4 md:p-6 lg:p-8">Home</div>
              }
            />
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
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;
