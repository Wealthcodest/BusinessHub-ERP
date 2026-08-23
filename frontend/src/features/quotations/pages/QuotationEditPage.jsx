import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Breadcrumb, LoadingSkeleton, PageHeader, useToast } from "@/components/ui";
import { getBusinesses } from "@/features/business/storage/businessStorage";
import { getCustomers } from "@/features/customers/storage/customerStorage";
import { getProducts } from "@/features/products/storage/productStorage";
import { QuotationForm } from "../components";
import { quotationService } from "../services/quotationService";
export default function QuotationEditPage() { const { id } = useParams(); const navigate = useNavigate(); const toast = useToast(); const [quotation, setQuotation] = useState(null); useEffect(() => { quotationService.getById(id).then((item) => { if (!item) { toast.warning("Quotation not found."); navigate("/quotations"); return; } setQuotation(item); }); }, [id, navigate, toast]); async function submit(data) { try { await quotationService.update(id, data); toast.success("Quotation updated successfully."); navigate(`/quotations/${id}`); } catch { toast.error("Unable to update quotation."); } } if (!quotation) return <LoadingSkeleton />; return <div className="space-y-6"><PageHeader title="Edit Quotation" description="Update quotation details and line items." breadcrumb={<Breadcrumb items={[{ label: "Quotations", href: "/quotations" }, { label: "Edit" }]} />} /><QuotationForm businesses={getBusinesses()} customers={getCustomers()} products={getProducts()} defaultValues={quotation} onSubmit={submit} onCreateBusiness={() => navigate("/businesses/new")} /></div>; }
