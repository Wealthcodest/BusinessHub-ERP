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
import { CustomerCreatePage, CustomerDetailsPage, CustomerEditPage, CustomerPage } from "@/features/customers";
import { ProductCreatePage, ProductDetailsPage, ProductEditPage, ProductPage } from "@/features/products";
import { QuotationCreatePage, QuotationDetailsPage, QuotationEditPage, QuotationPage, QuotationPreviewPage } from "@/features/quotations";
import { InvoiceCreatePage, InvoiceDetailsPage, InvoiceEditPage, InvoiceFromQuotationPage, InvoicePage, InvoicePreviewPage } from "@/features/invoices";
import { DocumentThemePage } from "@/features/documentThemes";
import { ReportsPage } from "@/features/reports";
import { PaymentsPage } from "@/features/payments";
import ReceiptPage from "@/features/payments/pages/ReceiptPage";
import PaymentEditPage from "@/features/payments/pages/PaymentEditPage";
import { ProjectExpensesPage } from "@/features/expenses";
import { ProjectDetailsPage } from "@/features/projects";

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
          <Route path="businesses/:id/themes" element={<DocumentThemePage />} />
          <Route path="settings/document-themes" element={<DocumentThemePage />} />
          <Route path="customers" element={<CustomerPage />} />
          <Route path="customers/new" element={<CustomerCreatePage />} />
          <Route path="customers/:id" element={<CustomerDetailsPage />} />
          <Route path="customers/:id/edit" element={<CustomerEditPage />} />
          <Route path="products" element={<ProductPage />} />
          <Route path="products/new" element={<ProductCreatePage />} />
          <Route path="products/:id" element={<ProductDetailsPage />} />
          <Route path="products/:id/edit" element={<ProductEditPage />} />
          <Route path="quotations" element={<QuotationPage />} />
          <Route path="quotations/new" element={<QuotationCreatePage />} />
          <Route path="quotations/:id" element={<QuotationDetailsPage />} />
          <Route path="quotations/:id/edit" element={<QuotationEditPage />} />
          <Route path="quotations/:id/preview" element={<QuotationPreviewPage />} />
          <Route path="invoices" element={<InvoicePage />} />
          <Route path="invoices/new" element={<InvoiceCreatePage />} />
          <Route path="invoices/:id" element={<InvoiceDetailsPage />} />
          <Route path="invoices/:id/edit" element={<InvoiceEditPage />} />
          <Route path="invoices/:id/preview" element={<InvoicePreviewPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="payments" element={<PaymentsPage />} />
          <Route path="payments/:id/receipt" element={<ReceiptPage />} />
          <Route path="payments/:id/edit" element={<PaymentEditPage />} />
          <Route path="project-expenses" element={<ProjectExpensesPage />} />
          <Route path="projects/:id" element={<ProjectDetailsPage />} />
          <Route path="quotations/:id/invoice" element={<InvoiceFromQuotationPage />} />
          {/* Temporary Test Route */}
          <Route path="test-modal" element={<TestModal />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}
