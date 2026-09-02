import { getExpenses, saveExpenses } from "../storage/expenseStorage";
export const expenseService = { 
  async getAll() { return getExpenses(); }, 
  async getById(id) { return getExpenses().find((item) => String(item.id) === String(id)); },
  async create(data) { 
    const amount = Number(data.amount); 
    if (!data.invoiceId || !data.date || !data.category || !amount || amount <= 0) throw new Error("Invoice, date, category, and a positive amount are required."); 
    const now = new Date().toISOString(); 
    const item = { ...data, id: `expense-${Date.now()}`, amount, createdAt: now, updatedAt: now }; 
    saveExpenses([...getExpenses(), item]); 
    return item; 
  }, 
  async update(id, data) {
    const expenses = getExpenses();
    const current = expenses.find((item) => String(item.id) === String(id));
    if (!current) throw new Error("Expense record could not be found.");
    const amount = Number(data.amount);
    if (!data.invoiceId || !data.date || !data.category || !amount || amount <= 0) throw new Error("Invoice, date, category, and a positive amount are required.");
    const updated = { ...current, ...data, id: current.id, amount, createdAt: current.createdAt, updatedAt: new Date().toISOString() };
    saveExpenses(expenses.map((item) => String(item.id) === String(id) ? updated : item));
    return updated;
  },
  async delete(id) { 
    saveExpenses(getExpenses().filter((item) => String(item.id) !== String(id))); 
  } 
};
