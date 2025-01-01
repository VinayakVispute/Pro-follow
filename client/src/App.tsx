
import './index.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router'

import AdminLayout from "./components/layout/AdminLayout"
import AdminDashboard from "./components/pages/AdminDashboard"

function App() {
  return (
    <div className="min-h-screen bg-background antialiased">

      <main className="relative flex min-h-screen flex-col">
        <div className="flex-1">
          <Routes>
            <Route path="/" element={
              <div className="container flex-1 p-4 md:p-6 lg:p-8">
                Home
              </div>
            } />
            <Route path="/dashboard" element={
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            } />
          </Routes>
        </div>
      </main>

    </div>
  )
}

export default App

