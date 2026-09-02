import { useEffect, useState } from "react";
import { Copy, Eye, Mail, Pencil } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Breadcrumb, Button, Card, LoadingSkeleton, PageHeader, Section, useToast } from "@/components/ui";
import { getBusinesses } from "@/features/business/storage/businessStorage";
import { getCustomers } from "@/features/customers/storage/customerStorage";
import { QuotationNotes, QuotationSummaryCard, QuotationTotalsCard } from "../components";
import { quotationService } from "../services/quotationService"; import { invoiceService } from "@/features/invoices/services/invoiceService";
export default function QuotationDetailsPage() { 
  const { id } = useParams(); 
  const navigate = useNavigate(); 
  const toast = useToast(); 
  const [quotation, setQuotation] = useState(null); 
  
  useEffect(() => { 
    quotationService.getById(id).then((item) => { 
      if (!item) { 
        toast.warning("Quotation not found."); 
        navigate("/quotations"); 
        return; 
      } 
      setQuotation(item); 
    }); 
  }, [id, navigate, toast]);

  // Refresh data when tab becomes visible or focused
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        quotationService.getById(id).then((item) => {
          if (item) setQuotation(item);
        });
      }
    };

    const handleFocus = () => {
      quotationService.getById(id).then((item) => {
        if (item) setQuotation(item);
      });
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, [id]); async function duplicate() { const copy = await quotationService.duplicate(id); toast.success("Quotation duplicated as a draft."); navigate(`/quotations/${copy.id}/edit`); } async function convert() { const invoice = await invoiceService.fromQuotation(quotation); toast.success("Invoice ready for this quotation."); navigate(`/invoices/${invoice.id}`); } if (!quotation) return <LoadingSkeleton />; const business = getBusinesses().find((item) => String(item.id) === String(quotation.businessId)); const customer = getCustomers().find((item) => String(item.id) === String(quotation.customerId)); return <div className="space-y-6"><PageHeader title={quotation.quotationNumber} description="Quotation details and customer proposal." breadcrumb={<Breadcrumb items={[{ label: "Quotations", href: "/quotations" }, { label: quotation.quotationNumber }]} />} actions={<div className="flex flex-wrap gap-2"><Button onClick={() => navigate(`/quotations/${id}/preview`)}><Eye className="mr-2 h-4 w-4" />Preview</Button><Button onClick={convert}>Convert to Invoice</Button><Button onClick={() => navigate(`/quotations/${id}/edit`)}><Pencil className="mr-2 h-4 w-4" />Edit</Button></div>} /><div className="grid gap-6 lg:grid-cols-2"><QuotationSummaryCard quotation={quotation} /><QuotationTotalsCard totals={quotation} currency={quotation.currency} /></div><div className="grid gap-6 lg:grid-cols-2"><Section title="Business Information"><Card><p className="font-semibold text-slate-800">{business?.name || "â€”"}</p><p className="mt-2 text-sm text-slate-600">{business?.email}</p><p className="text-sm text-slate-600">{business?.phone}</p></Card></Section><Section title="Customer Information"><Card><p className="font-semibold text-slate-800">{customer?.displayName || "â€”"}</p><p className="mt-2 text-sm text-slate-600">{customer?.companyName}</p><p className="text-sm text-slate-600">{customer?.email}</p></Card></Section></div><Section title="Items"><Card><div className="overflow-x-auto"><table className="w-full min-w-[650px] text-left text-sm"><thead className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500"><tr>{["Description", "Quantity", "Unit Price", "Discount", "Tax", "Line Total"].map((heading) => <th key={heading} className="px-3 py-3">{heading}</th>)}</tr></thead><tbody>{quotation.items.map((item) => <tr key={item.id} className="border-b border-slate-100"><td className="px-3 py-4 font-medium">{item.description}</td><td className="px-3 py-4">{item.quantity}</td><td className="px-3 py-4">{Number(item.unitPrice).toLocaleString()}</td><td className="px-3 py-4">{item.discount || 0}%</td><td className="px-3 py-4">{item.tax || 0}%</td><td className="px-3 py-4 font-semibold">{Number(item.lineTotal || 0).toLocaleString()}</td></tr>)}</tbody></table></div></Card></Section><QuotationNotes notes={quotation.notes} terms={quotation.terms} /><Section title="Timeline"><Card><p className="text-sm text-slate-500">Quotation activity and customer delivery tracking will appear here.</p></Card></Section><div className="flex flex-wrap gap-3"><Button onClick={duplicate}><Copy className="mr-2 h-4 w-4" />Duplicate</Button><Button onClick={() => toast.info("Email delivery will be available in a future release.")}><Mail className="mr-2 h-4 w-4" />Email Placeholder</Button></div></div>; }
