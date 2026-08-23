const STORAGE_KEY = "businesshub_products";

export const getProducts = () => JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
export const saveProducts = (products) => localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
export const seedProducts = (products) => { if (!getProducts().length) saveProducts(products); };
