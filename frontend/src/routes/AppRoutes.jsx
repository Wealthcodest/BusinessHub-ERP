import TestModal from "@/features/business/pages/TestModal";

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
  BusinessDetailsPage,
} from "@/features/business";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ALL pages that should have the Sidebar/Header go inside this Route */}

        <Route path="/" element={<DashboardLayout />}>

          <Route index element={<DashboardPage />} />

          <Route path="businesses" element={<BusinessPage />} />

          <Route path="businesses/new" element={<BusinessCreatePage />} />

          <Route path="businesses/:id" element={<BusinessDetailsPage />} />

          <Route
            path="businesses/:id/edit"
            element={<BusinessEditPage />}
          />
          {/* Temporary Test Route */}
          <Route path="test-modal" element={<TestModal />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}