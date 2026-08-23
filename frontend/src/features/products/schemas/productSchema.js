import { z } from "zod";

const number = z.coerce.number().min(0, "Must be zero or greater.");
export const productSchema = z.object({
  businessId: z.string().min(1, "Business is required."), sku: z.string().min(1, "SKU is required."), barcode: z.string().optional(),
  name: z.string().min(2, "Product name is required."), description: z.string().optional(), category: z.string().optional(), brand: z.string().optional(),
  type: z.enum(["Product", "Service"]), unit: z.string().min(1, "Unit is required."), costPrice: number, sellingPrice: number,
  currency: z.string().min(1), taxRate: number, discount: number, openingStock: number, minimumStock: number, reorderLevel: number,
  trackInventory: z.boolean(), status: z.enum(["active", "inactive"]), featured: z.boolean(), thumbnail: z.any().optional(), images: z.array(z.any()).optional(),
});
