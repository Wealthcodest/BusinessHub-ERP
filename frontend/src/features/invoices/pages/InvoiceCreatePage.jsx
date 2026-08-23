import { useNavigate } from "react-router-dom";
import { Breadcrumb, PageHeader, useToast } from "@/components/ui";
import { getBusinesses } from "@/features/business/storage/businessStorage";
import { getCustomers } from "@/features/customers/storage/customerStorage";
import { getProducts } from "@/features/products/storage/productStorage";
import { InvoiceForm } from "../components";
import { invoiceService } from "../services/invoiceService";
import { generateInvoiceNumber } from "../utils/invoiceNumberGenerator";
export default function InvoiceCreatePage() { const navigate = useNavigate(); const toast = useToast(); async function submit(data) { try { const invoice = await invoiceService.create(data); toast.success("Invoice created successfully."); navigate(`/invoices/${invoice.id}`); } catch { toast.error("Unable to create invoice."); } } return <div className="space-y-6"><PageHeader title="Create Invoice" description="Prepare a project invoice organised into sessions." breadcrumb={<Breadcrumb items={[{ label: "Invoices", href: "/invoices" }, { label: "Create" }]} />} /><InvoiceForm businesses={getBusinesses()} customers={getCustomers()} products={getProducts()} defaultValues={{ invoiceNumber: generateInvoiceNumber() }} onSubmit={submit} onCreateBusiness={() => navigate("/businesses/new")} /></div>; }
