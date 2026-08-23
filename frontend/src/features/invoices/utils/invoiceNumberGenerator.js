import { getInvoices } from "../storage/invoiceStorage";
export const generateInvoiceNumber = () => { const prefix = `INV-${new Date().getFullYear()}-`; const count = getInvoices().filter((item) => item.invoiceNumber?.startsWith(prefix)).length + 1; return `${prefix}${String(count).padStart(6, "0")}`; };
