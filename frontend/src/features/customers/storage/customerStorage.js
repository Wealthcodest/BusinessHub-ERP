const STORAGE_KEY = "businesshub_customers";
export const getCustomers = () => JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
export const saveCustomers = (customers) => localStorage.setItem(STORAGE_KEY, JSON.stringify(customers));
export const seedCustomers = (customers) => { if (!getCustomers().length) saveCustomers(customers); };
