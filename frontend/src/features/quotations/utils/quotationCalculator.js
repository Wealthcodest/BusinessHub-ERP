import { calculateDocumentSessions } from "@/features/documentSessions";
export function calculateLineItem(item) { return { ...item, lineTotal: Number(item.quantity || 0) * Number(item.unitPrice || 0) }; }
export function calculateQuotation(sessions = []) { return calculateDocumentSessions(sessions); }
