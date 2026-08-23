const STORAGE_KEY = "businesshub_payments";
export const getPayments = () => JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
export const savePayments = (payments) => localStorage.setItem(STORAGE_KEY, JSON.stringify(payments));
