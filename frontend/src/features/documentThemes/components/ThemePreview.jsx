import DocumentPreview from "./DocumentPreview";
const items = [{ id: "sample-1", description: "Sample item", quantity: 1, unitPrice: 10000, lineTotal: 10000 }, { id: "sample-2", description: "Installation", quantity: 2, unitPrice: 5000, lineTotal: 10000 }];
const sample = { invoiceNumber: "INV-0001", issueDate: "2026-08-13", dueDate: "2026-08-30", currency: "NGN", paymentTerms: "Net 30", notes: "Thank you for your business.", sessions: [{ id: "general", title: "General Items", items }], subtotal: 20000, discountAmount: 1000, taxAmount: 1425, grandTotal: 20425 };
export default function ThemePreview({ theme, business }) { return <DocumentPreview document={sample} business={business} customer={{ displayName: "Sample Customer", email: "sample.customer@example.com",  phone: "08012345678",
        address: "12 Example Street, Lagos, Nigeria", }} theme={theme} />; }
