import { useNavigate } from "react-router-dom";
import { Breadcrumb, PageHeader, useToast } from "@/components/ui";
import { getBusinesses } from "@/features/business/storage/businessStorage";
import { ProductForm } from "../components";
import { productService } from "../services/productService";
export default function ProductCreatePage() { const navigate = useNavigate(); const toast = useToast(); async function handleSubmit(data) { try { await productService.create(data); toast.success("Product created successfully."); navigate("/products"); } catch { toast.error("Unable to create product."); } } return <div className="space-y-6"><PageHeader title="Create Product or Service" description="Add an item to your catalog." breadcrumb={<Breadcrumb items={[{ label: "Products", href: "/products" }, { label: "Create" }]} />} /><ProductForm businesses={getBusinesses()} onSubmit={handleSubmit} onCreateBusiness={() => navigate("/businesses/new")} /></div>; }
