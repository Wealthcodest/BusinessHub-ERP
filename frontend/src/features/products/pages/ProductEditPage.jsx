import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Breadcrumb, LoadingSkeleton, PageHeader, useToast } from "@/components/ui";
import { getBusinesses } from "@/features/business/storage/businessStorage";
import { ProductForm } from "../components";
import { productService } from "../services/productService";
export default function ProductEditPage() { const { id } = useParams(); const navigate = useNavigate(); const toast = useToast(); const [product, setProduct] = useState(null); useEffect(() => { productService.getById(id).then((item) => { if (!item) { toast.warning("Product not found."); navigate("/products"); return; } setProduct(item); }); }, [id, navigate, toast]); async function handleSubmit(data) { try { await productService.update(id, data); toast.success("Product updated successfully."); navigate(`/products/${id}`); } catch { toast.error("Unable to update product."); } } if (!product) return <LoadingSkeleton />; return <div className="space-y-6"><PageHeader title="Edit Product" description="Update catalog, pricing, and inventory information." breadcrumb={<Breadcrumb items={[{ label: "Products", href: "/products" }, { label: "Edit" }]} />} /><ProductForm businesses={getBusinesses()} defaultValues={product} onSubmit={handleSubmit} onCreateBusiness={() => navigate("/businesses/new")} /></div>; }
