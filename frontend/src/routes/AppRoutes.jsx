import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layout
import DashboardLayout from "@/layouts/DashboardLayout";

// Dashboard
import DashboardPage from "@/features/dashboard/pages/DashboardPage";

// Business
import {
  BusinessPage,
  BusinessCreatePage,
  BusinessEditPage,
} from "@/features/business";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<DashboardLayout />}>

          {/* Dashboard */}

          <Route
            index
            element={<DashboardPage />}
          />

          {/* Business */}

          <Route
            path="businesses"
            element={<BusinessPage />}
          />

          <Route
            path="businesses/new"
            element={<BusinessCreatePage />}
          />

          <Route
            path="businesses/:id/edit"
            element={<BusinessEditPage />}
/>

        </Route>

      </Routes>
    </BrowserRouter>
  );
}