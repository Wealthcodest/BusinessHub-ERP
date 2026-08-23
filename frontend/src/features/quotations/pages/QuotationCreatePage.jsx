import { useNavigate } from "react-router-dom";
import { Breadcrumb, PageHeader, useToast } from "@/components/ui";
import { getBusinesses } from "@/features/business/storage/businessStorage";
import { getCustomers } from "@/features/customers/storage/customerStorage";
import { getProducts } from "@/features/products/storage/productStorage";
import { QuotationForm } from "../components";
import { quotationService } from "../services/quotationService";
import { generateQuotationNumber } from "../utils/quotationNumberGenerator";
export default function QuotationCreatePage() { const navigate = useNavigate(); const toast = useToast(); async function submit(data) { try { await quotationService.create(data); toast.success("Quotation created successfully."); navigate("/quotations"); } catch { toast.error("Unable to create quotation."); } } return <div className="space-y-6"><PageHeader title="Create Quotation" description="Prepare a customer quotation from your catalog." breadcrumb={<Breadcrumb items={[{ label: "Quotations", href: "/quotations" }, { label: "Create" }]} />} /><QuotationForm businesses={getBusinesses()} customers={getCustomers()} products={getProducts()} defaultValues={{ quotationNumber: generateQuotationNumber() }} onSubmit={submit} onCreateBusiness={() => navigate("/businesses/new")} /></div>; }
