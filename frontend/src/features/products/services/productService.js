import { getBusinesses } from "@/features/business/storage/businessStorage";
import { getProducts, saveProducts, seedProducts } from "../storage/productStorage";

const businessId = getBusinesses()[0]?.id || "1";
const now = "2026-08-06";
const product = (id, name, type, overrides = {}) => ({ id: `product-${id}`, businessId, sku: type === "Service" ? `SVC-${1000 + id}` : `PRD-${1000 + id}`, barcode: `890${String(id).padStart(9, "0")}`, name, slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""), description: `${name} for everyday business operations.`, category: type === "Service" ? "Professional Services" : "General", brand: "BusinessHub", type, unit: type === "Service" ? "hour" : "piece", costPrice: type === "Service" ? 15000 : 3000 + id * 500, sellingPrice: type === "Service" ? 30000 : 6000 + id * 900, currency: "NGN", taxRate: 7.5, discount: 0, openingStock: type === "Service" ? 0 : 8 + id, minimumStock: type === "Service" ? 0 : 5, reorderLevel: type === "Service" ? 0 : 8, trackInventory: type === "Product", status: "active", featured: id % 3 === 0, images: [], thumbnail: "", createdAt: now, updatedAt: now, ...overrides });

seedProducts([
  product(1, "Wireless Keyboard", "Product", { category: "Electronics", brand: "Logitech", openingStock: 32, minimumStock: 8, reorderLevel: 12 }), product(2, "Office Chair", "Product", { category: "Furniture", openingStock: 4, minimumStock: 5, reorderLevel: 8 }), product(3, "A4 Copy Paper", "Product", { category: "Office Supplies", openingStock: 0, minimumStock: 10, reorderLevel: 20 }), product(4, "Printer Ink Cartridge", "Product", { category: "Office Supplies", openingStock: 14, minimumStock: 5, reorderLevel: 8 }), product(5, "USB-C Hub", "Product", { category: "Electronics", openingStock: 18, minimumStock: 6, reorderLevel: 10 }), product(6, "Packaging Box", "Product", { category: "Packaging", openingStock: 50, minimumStock: 15, reorderLevel: 25 }), product(7, "Safety Gloves", "Product", { category: "Safety", openingStock: 7, minimumStock: 10, reorderLevel: 15 }), product(8, "Desk Lamp", "Product", { category: "Furniture", openingStock: 12, minimumStock: 4, reorderLevel: 8 }), product(9, "Shipping Label Roll", "Product", { category: "Packaging", openingStock: 40, minimumStock: 10, reorderLevel: 15 }), product(10, "Laptop Stand", "Product", { category: "Electronics", openingStock: 9, minimumStock: 4, reorderLevel: 7 }),
  product(11, "Business Consultation", "Service"), product(12, "Bookkeeping Service", "Service"), product(13, "Website Maintenance", "Service"), product(14, "Delivery Service", "Service"), product(15, "Equipment Installation", "Service"),
]);

const slugify = (name) => name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
export const productService = {
  async getAll() { return getProducts(); },
  async getById(id) { return getProducts().find((item) => String(item.id) === String(id)); },
  async create(data) { const item = { ...data, id: `product-${Date.now()}`, slug: slugify(data.name), createdAt: new Date().toISOString().slice(0, 10), updatedAt: new Date().toISOString().slice(0, 10) }; saveProducts([...getProducts(), item]); return item; },
  async update(id, data) { const products = getProducts().map((item) => String(item.id) === String(id) ? { ...item, ...data, slug: slugify(data.name), updatedAt: new Date().toISOString().slice(0, 10) } : item); saveProducts(products); return products.find((item) => String(item.id) === String(id)); },
  async delete(id) { saveProducts(getProducts().filter((item) => String(item.id) !== String(id))); return true; },
};
