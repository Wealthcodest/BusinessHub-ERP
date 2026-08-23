import { calculateDocumentSessions } from "@/features/documentSessions";
export function calculateInvoice(sessions = [], amountPaid = 0) { const totals = calculateDocumentSessions(sessions); const paid = Math.min(Number(amountPaid || 0), totals.grandTotal); return { ...totals, amountPaid: paid, balance: totals.grandTotal - paid }; }
