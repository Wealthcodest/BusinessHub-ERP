import { getPayments, savePayments } from "../storage/paymentStorage";
import { invoiceService } from "@/features/invoices/services/invoiceService";

const amount = (value) => Number(value || 0);
const receiptNumber = () => `RCP-${String(getPayments().length + 1).padStart(6, "0")}`;

function nextStatus(invoice, paid, balance) {
  if (["draft", "cancelled"].includes(invoice.status)) return invoice.status;
  if (balance <= 0) return "paid";
  if (paid > 0) return "partially_paid";
  return invoice.dueDate && invoice.dueDate < new Date().toISOString().slice(0, 10) ? "overdue" : "sent";
}

export const paymentService = {
  async getAll() { return getPayments(); },
  async getById(id) { return getPayments().find((payment) => String(payment.id) === String(id)); },
  async record(data) {
    const invoice = await invoiceService.getById(data.invoiceId);
    if (!invoice) throw new Error("The selected invoice could not be found.");
    if (["draft", "cancelled"].includes(invoice.status)) throw new Error("Payments cannot be recorded against this invoice.");
    const previousBalance = Math.max(0, amount(invoice.balance));
    const received = amount(data.amount);
    if (!Number.isFinite(received) || received <= 0) throw new Error("Enter a payment amount greater than zero.");
    if (received > previousBalance + 0.0001) throw new Error("Payment amount cannot exceed the outstanding balance.");
    const totalPaid = amount(invoice.amountPaid) + received;
    const balanceAfterPayment = Math.max(0, previousBalance - received);
    const now = new Date().toISOString();
    const payment = { id: `payment-${Date.now()}`, receiptNumber: receiptNumber(), invoiceId: invoice.id, businessId: invoice.businessId, customerId: invoice.customerId, paymentDate: data.paymentDate, amount: received, paymentMethod: data.paymentMethod, reference: data.reference?.trim() || "", notes: data.notes?.trim() || "", receivedBy: data.receivedBy?.trim() || "Administrator", invoiceTotal: amount(invoice.grandTotal), previousAmountPaid: amount(invoice.amountPaid), previousBalance, balanceAfterPayment, totalPaid, createdAt: now, updatedAt: now };
    await invoiceService.update(invoice.id, { ...invoice, amountPaid: totalPaid, status: nextStatus(invoice, totalPaid, balanceAfterPayment) });
    savePayments([...getPayments(), payment]);
    return payment;
  },
  async update(id, data) {
    const payments = getPayments();
    const current = payments.find((payment) => String(payment.id) === String(id));
    if (!current) throw new Error("Payment record could not be found.");
    const invoice = await invoiceService.getById(current.invoiceId);
    if (!invoice) throw new Error("The linked invoice could not be found.");
    const received = amount(data.amount);
    const otherPayments = payments.filter((payment) => String(payment.invoiceId) === String(current.invoiceId) && String(payment.id) !== String(current.id));
    const otherRecorded = otherPayments.reduce((total, payment) => total + amount(payment.amount), 0);
    const legacyPaid = Math.max(0, amount(invoice.amountPaid) - amount(current.amount) - otherRecorded);
    const maximum = Math.max(0, amount(invoice.grandTotal) - legacyPaid - otherRecorded);
    if (!Number.isFinite(received) || received <= 0) throw new Error("Enter a payment amount greater than zero.");
    if (received > maximum + 0.0001) throw new Error("Payment amount cannot exceed the remaining invoice balance.");
    const totalPaid = legacyPaid + otherRecorded + received;
    const balanceAfterPayment = Math.max(0, amount(invoice.grandTotal) - totalPaid);
    const updated = { ...current, ...data, id: current.id, receiptNumber: current.receiptNumber, invoiceId: current.invoiceId, businessId: current.businessId, customerId: current.customerId, amount: received, previousAmountPaid: Math.max(0, totalPaid - received), previousBalance: Math.max(0, amount(invoice.grandTotal) - (totalPaid - received)), totalPaid, balanceAfterPayment, updatedAt: new Date().toISOString() };
    savePayments(payments.map((payment) => String(payment.id) === String(id) ? updated : payment));
    await invoiceService.update(invoice.id, { ...invoice, amountPaid: totalPaid, status: nextStatus(invoice, totalPaid, balanceAfterPayment) });
    return updated;
  },
};
