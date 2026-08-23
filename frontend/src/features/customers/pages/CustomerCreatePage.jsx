import { useNavigate } from "react-router-dom";
import { Breadcrumb, PageHeader, useToast } from "@/components/ui";
import { CustomerForm } from "../components";
import { getBusinesses } from "@/features/business/storage/businessStorage";
import { customerService } from "../services/customerService";
export default function CustomerCreatePage() { const navigate = useNavigate(); const toast = useToast(); const businesses = getBusinesses(); async function handleSubmit(data) { try { await customerService.create(data); toast.success("Customer created successfully."); navigate("/customers"); } catch { toast.error("Unable to create customer."); } } return <div className="space-y-6"><PageHeader title="Create Customer" description="Add a customer to one of your businesses." breadcrumb={<Breadcrumb items={[{ label: "Customers", href: "/customers" }, { label: "Create Customer" }]} />} /><CustomerForm businesses={businesses} onSubmit={handleSubmit} onCreateBusiness={() => navigate("/businesses/new")} /></div>; }
