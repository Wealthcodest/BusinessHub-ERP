import { DocumentPreview } from "@/features/documentThemes/components";
export default function InvoicePreview({ invoice, business, customer, resolvedTheme }) { return <DocumentPreview document={invoice} business={business} customer={customer} theme={resolvedTheme?.theme} type="invoice" printable />; }
