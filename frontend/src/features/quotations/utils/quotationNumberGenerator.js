import { getQuotations } from "../storage/quotationStorage";
export function generateQuotationNumber() { const year = new Date().getFullYear(); const prefix = `QT-${year}-`; const sequence = getQuotations().filter((quotation) => quotation.quotationNumber?.startsWith(prefix)).length + 1; return `${prefix}${String(sequence).padStart(6, "0")}`; }
