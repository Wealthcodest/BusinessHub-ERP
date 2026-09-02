import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BarChart3, CreditCard, Pencil, ReceiptText, TrendingDown, TrendingUp, WalletCards } from "lucide-react";
import { Button, Card, LoadingSkeleton, PageHeader, Section, useToast } from "@/components/ui";
import useCustomers from "@/features/customers/hooks/useCustomers";
import useExpenses from "@/features/expenses/hooks/useExpenses";
import useInvoices from "@/features/invoices/hooks/useInvoices";
import usePayments from "@/features/payments/hooks/usePayments";
import RecordPaymentModal from "@/features/payments/components/RecordPaymentModal";
import { paymentService } from "@/features/payments/services/paymentService";

const money = (value, currency = "NGN") => new Intl.NumberFormat("en-NG", { style: "currency", currency }).format(Number(value || 0));
const ratio = (value, total) => Math.max(0, Math.min(100, total ? (value / total) * 100 : 0));

export default function ProjectDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [savingPayment, setSavingPayment] = useState(false);
  const { invoices, loading: invoicesLoading, refreshInvoices } = useInvoices();
  const { payments, loading: paymentsLoading, refreshPayments } = usePayments();
  const { expenses, loading: expensesLoading } = useExpenses();
  const { customers, loading: customersLoading } = useCustomers();
  const invoice = invoices.find((item) => String(item.id) === String(id));
  const report = useMemo(() => {
    if (!invoice) return null;
    const projectExpenses = expenses.filter((item) => String(item.invoiceId) === String(id)).sort((a, b) => String(b.date).localeCompare(String(a.date)));
    const projectPayments = payments.filter((item) => String(item.invoiceId) === String(id)).sort((a, b) => String(b.paymentDate).localeCompare(String(a.paymentDate)));
    const revenue = Number(invoice.grandTotal || 0);
    const cost = projectExpenses.reduce((sum, item) => sum + Number(item.amount || 0), 0);
    const collected = projectPayments.reduce((sum, item) => sum + Number(item.amount || 0), 0);
    const profit = revenue - cost;
    const costByCategory = projectExpenses.reduce((totals, item) => ({ ...totals, [item.category || "Other"]: (totals[item.category || "Other"] || 0) + Number(item.amount || 0) }), {});
    return { projectExpenses, projectPayments, revenue, cost, collected, profit, outstanding: Math.max(0, revenue - collected), margin: revenue ? (profit / revenue) * 100 : 0, costByCategory };
  }, [invoice, expenses, payments, id]);
  const recordPayment = async (data) => {
    setSavingPayment(true);
    try { await paymentService.record(data); await Promise.all([refreshPayments(), refreshInvoices()]); toast.success("Payment recorded successfully."); setPaymentModalOpen(false); }
    catch (error) { toast.error(error.message || "Unable to record payment."); }
    finally { setSavingPayment(false); }
  };
  if (invoicesLoading || paymentsLoading || expensesLoading || customersLoading || !report) return <LoadingSkeleton />;
  const customer = customers.find((item) => String(item.id) === String(invoice.customerId));
  const metrics = [
    ["Contract revenue", report.revenue, TrendingUp, "text-emerald-700"], ["Project expenses", report.cost, TrendingDown, "text-rose-700"], ["Net profit", report.profit, BarChart3, report.profit >= 0 ? "text-teal-700" : "text-rose-700"], ["Cash collected", report.collected, WalletCards, "text-sky-700"], ["Outstanding", report.outstanding, ReceiptText, "text-amber-700"],
  ];
  return <div className="space-y-6">
    <PageHeader title={`Project Report · ${invoice.invoiceNumber}`} description={`${customer?.displayName || "Unknown customer"} · ${invoice.quotationId ? "Quotation linked" : "Direct invoice"}`} actions={<><Button variant="secondary" onClick={() => navigate(`/invoices/${id}`)}>View Invoice</Button><Button onClick={() => setPaymentModalOpen(true)}><CreditCard className="mr-2 h-4 w-4" />Record Payment</Button><Button onClick={() => navigate(`/project-expenses?invoice=${id}`)}>Add Expense</Button></>} />
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">{metrics.map(([label, value, Icon, tone]) => <Card key={label}><div className="flex items-start justify-between"><p className="text-sm text-slate-500">{label}</p><Icon className={`h-5 w-5 ${tone}`} /></div><p className={`mt-2 text-xl font-bold ${tone}`}>{money(value, invoice.currency)}</p></Card>)}</div>
    <div className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]"><Section title="Financial health"><Card><div className="space-y-5"><Progress label="Profit margin" value={report.margin} text={`${report.margin.toFixed(1)}%`} tone={report.profit >= 0 ? "bg-emerald-500" : "bg-rose-500"} /><Progress label="Revenue collected" value={ratio(report.collected, report.revenue)} text={`${ratio(report.collected, report.revenue).toFixed(1)}%`} tone="bg-sky-500" /><Progress label="Budget spent" value={ratio(report.cost, report.revenue)} text={`${ratio(report.cost, report.revenue).toFixed(1)}%`} tone="bg-amber-500" /></div></Card></Section><Section title="Project insight"><Card><p className="text-sm text-slate-600">{report.profit >= 0 ? "This project is currently profitable." : "Expenses currently exceed contract revenue."}</p><dl className="mt-4 space-y-3 text-sm"><div className="flex justify-between"><dt className="text-slate-500">Expense records</dt><dd className="font-semibold">{report.projectExpenses.length}</dd></div><div className="flex justify-between"><dt className="text-slate-500">Payment records</dt><dd className="font-semibold">{report.projectPayments.length}</dd></div><div className="flex justify-between"><dt className="text-slate-500">Invoice status</dt><dd className="font-semibold capitalize">{String(invoice.status || "draft").replaceAll("_", " ")}</dd></div></dl></Card></Section></div>
    <Section title="Expense analysis"><Card>{Object.keys(report.costByCategory).length ? <div className="space-y-3">{Object.entries(report.costByCategory).sort((a, b) => b[1] - a[1]).map(([category, value]) => <div key={category}><div className="flex justify-between text-sm"><span>{category}</span><b>{money(value, invoice.currency)}</b></div><div className="mt-1.5 h-2 rounded-full bg-slate-100"><div className="h-2 rounded-full bg-rose-500" style={{ width: `${ratio(value, report.cost)}%` }} /></div></div>)}</div> : <p className="py-3 text-sm text-slate-500">No project expenses recorded.</p>}</Card></Section>
    <Section title="Expense ledger"><Card><div className="mb-4 flex justify-between"><p className="text-sm text-slate-500">All costs recorded against this project.</p><Button size="sm" onClick={() => navigate(`/project-expenses?invoice=${id}`)}>Add expense</Button></div><Ledger headers={["Date", "Category", "Description", "Vendor", "Amount", ""]}>{report.projectExpenses.map((expense) => <tr key={expense.id} className="border-t border-slate-100"><td className="px-3 py-3">{expense.date}</td><td className="px-3 py-3">{expense.category}</td><td className="px-3 py-3">{expense.description || "—"}</td><td className="px-3 py-3">{expense.vendor || "—"}</td><td className="px-3 py-3 font-semibold text-rose-700">{money(expense.amount, invoice.currency)}</td><td className="px-3 py-3 text-right"><button onClick={() => navigate(`/project-expenses?invoice=${id}&edit=${expense.id}`)} className="inline-flex items-center gap-1 font-medium text-blue-600 hover:underline"><Pencil className="h-4 w-4" />Edit</button></td></tr>)}</Ledger>{!report.projectExpenses.length && <p className="py-6 text-center text-sm text-slate-500">No expenses recorded for this project.</p>}</Card></Section>
    <Section title="Payment ledger"><Card><div className="mb-4 flex justify-between"><p className="text-sm text-slate-500">Payments received for this project.</p><Button size="sm" onClick={() => setPaymentModalOpen(true)}>Record payment</Button></div><Ledger headers={["Date", "Receipt", "Method", "Reference", "Amount", ""]}>{report.projectPayments.map((payment) => <tr key={payment.id} className="border-t border-slate-100"><td className="px-3 py-3">{payment.paymentDate}</td><td className="px-3 py-3 font-medium text-[#103746]">{payment.receiptNumber}</td><td className="px-3 py-3">{payment.paymentMethod}</td><td className="px-3 py-3">{payment.reference || "—"}</td><td className="px-3 py-3 font-semibold text-emerald-700">{money(payment.amount, invoice.currency)}</td><td className="px-3 py-3 text-right"><button onClick={() => navigate(`/payments/${payment.id}/edit`)} className="inline-flex items-center gap-1 font-medium text-blue-600 hover:underline"><Pencil className="h-4 w-4" />Edit</button></td></tr>)}</Ledger>{!report.projectPayments.length && <p className="py-6 text-center text-sm text-slate-500">No payments recorded for this project.</p>}</Card></Section>    <RecordPaymentModal open={paymentModalOpen} invoices={invoices} customers={customers} businesses={[]} initialInvoiceId={id} onClose={() => setPaymentModalOpen(false)} onSubmit={recordPayment} saving={savingPayment} />
  </div>;
}
function Progress({ label, value, text, tone }) { return <div><div className="flex justify-between text-sm"><span className="text-slate-600">{label}</span><b>{text}</b></div><div className="mt-2 h-2.5 rounded-full bg-slate-100"><div className={`h-2.5 rounded-full ${tone}`} style={{ width: `${Math.max(0, Math.min(100, value))}%` }} /></div></div>; }
function Ledger({ headers, children }) { return <div className="overflow-x-auto"><table className="w-full min-w-[720px] text-sm"><thead className="bg-slate-50 text-left text-xs uppercase text-slate-500"><tr>{headers.map((header, index) => <th key={`${header}-${index}`} className="px-3 py-3 font-medium">{header}</th>)}</tr></thead><tbody>{children}</tbody></table></div>; }