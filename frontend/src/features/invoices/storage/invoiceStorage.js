const STORAGE_KEY = "businesshub_invoices";
export const getInvoices = () => JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
export const saveInvoices = (invoices) => localStorage.setItem(STORAGE_KEY, JSON.stringify(invoices));
export const seedInvoices = (invoices) => { if (!getInvoices().length) saveInvoices(invoices); };
