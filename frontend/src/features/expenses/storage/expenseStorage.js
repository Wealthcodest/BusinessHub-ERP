const KEY = "businesshub_project_expenses";
export const getExpenses = () => JSON.parse(localStorage.getItem(KEY) || "[]");
export const saveExpenses = (items) => localStorage.setItem(KEY, JSON.stringify(items));
