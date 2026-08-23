const STORAGE_KEY = "businesshub_quotations";
export const getQuotations = () => JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
export const saveQuotations = (quotations) => localStorage.setItem(STORAGE_KEY, JSON.stringify(quotations));
export const seedQuotations = (quotations) => { if (!getQuotations().length) saveQuotations(quotations); };
