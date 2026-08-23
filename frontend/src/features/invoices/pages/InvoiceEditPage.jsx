import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Breadcrumb, LoadingSkeleton, PageHeader, useToast } from "@/components/ui";
import { getBusinesses } from "@/features/business/storage/businessStorage";
import { getCustomers } from "@/features/customers/storage/customerStorage";
import { getProducts } from "@/features/products/storage/productStorage";
import { InvoiceForm } from "../components";
import { invoiceService } from "../services/invoiceService";
export default function InvoiceEditPage() { const { id } = useParams(); const navigate = useNavigate(); const toast = useToast(); const [invoice, setInvoice] = useState(null); useEffect(() => { invoiceService.getById(id).then((item) => { if (!item) { toast.warning("Invoice not found."); navigate("/invoices"); return; } setInvoice(item); }); }, [id, navigate, toast]); async function submit(data) { try { await invoiceService.update(id, data); toast.success("Invoice updated successfully."); navigate(`/invoices/${id}`); } catch { toast.error("Unable to update invoice."); } } if (!invoice) return <LoadingSkeleton />; return <div className="space-y-6"><PageHeader title="Edit Invoice" description="Update invoice details, sessions, and line items." breadcrumb={<Breadcrumb items={[{ label: "Invoices", href: "/invoices" }, { label: invoice.invoiceNumber, href: `/invoices/${id}` }, { label: "Edit" }]} />} /><InvoiceForm businesses={getBusinesses()} customers={getCustomers()} products={getProducts()} defaultValues={invoice} onSubmit={submit} onCreateBusiness={() => navigate("/businesses/new")} /></div>; }
