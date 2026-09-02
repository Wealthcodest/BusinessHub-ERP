import {useEffect,useState} from "react";import {useNavigate,useParams} from "react-router-dom";import {PageHeader,Breadcrumb,Button,LoadingSkeleton,Section,Card} from "@/components/ui";import {invoiceService} from "../services/invoiceService";import {InvoiceSummaryCard,InvoiceTotalsCard,InvoicePaymentSummary,InvoiceTimeline} from "../components";import usePayments from "@/features/payments/hooks/usePayments";const money=(value,currency)=>new Intl.NumberFormat("en-NG",{style:"currency",currency:currency||"NGN"}).format(Number(value||0));export default function InvoiceDetailsPage(){
  const{id}=useParams(),n=useNavigate(),[invoice,setInvoice]=useState(null);
  const{payments}=usePayments();
  
  useEffect(()=>{
    invoiceService.getById(id).then(setInvoice)
  },[id]);

  // Refresh data when tab becomes visible or focused
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        invoiceService.getById(id).then(setInvoice);
      }
    };

    const handleFocus = () => {
      invoiceService.getById(id).then(setInvoice);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, [id]);if(!invoice)return <LoadingSkeleton/>;const history=payments.filter(payment=>String(payment.invoiceId)===String(id)).sort((a,b)=>String(b.paymentDate).localeCompare(String(a.paymentDate)));return <div className="space-y-6"><PageHeader title={invoice.invoiceNumber} breadcrumb={<Breadcrumb items={[{label:"Invoices",href:"/invoices"},{label:invoice.invoiceNumber}]}/>} actions={<div className="flex gap-2"><Button onClick={()=>n(`/projects/${id}`)}>View Project</Button><Button onClick={()=>n(`/invoices/${id}/edit`)}>Edit</Button><Button onClick={()=>n(`/invoices/${id}/preview`)}>Preview</Button></div>}/><div className="grid gap-6 lg:grid-cols-3"><InvoiceSummaryCard invoice={invoice}/><InvoiceTotalsCard invoice={invoice}/><InvoicePaymentSummary invoice={invoice}/></div><Section title="Payment History"><Card>{history.length?<div className="overflow-x-auto"><table className="w-full min-w-[620px] text-sm"><thead className="border-b text-left text-xs uppercase text-slate-500"><tr><th className="p-3">Date</th><th className="p-3">Receipt</th><th className="p-3">Amount</th><th className="p-3">Method</th><th className="p-3">Reference</th><th className="p-3 text-right">Balance after</th></tr></thead><tbody>{history.map(payment=><tr key={payment.id} className="border-b"><td className="p-3">{payment.paymentDate}</td><td className="p-3"><button onClick={()=>n(`/payments/${payment.id}/receipt`)} className="font-medium text-[#103746]">{payment.receiptNumber}</button></td><td className="p-3 font-medium text-emerald-700">{money(payment.amount,invoice.currency)}</td><td className="p-3">{payment.paymentMethod}</td><td className="p-3">{payment.reference||"ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â"}</td><td className="p-3 text-right">{money(payment.balanceAfterPayment,invoice.currency)}</td></tr>)}</tbody></table></div>:<p className="py-5 text-sm text-slate-500">No payments have been recorded for this invoice.</p>}</Card></Section><Section title="Sessions"><div className="space-y-4">{invoice.sessions.map((session)=><Card key={session.id}><div className="-m-6 overflow-hidden"><div className="border-b border-teal-100 bg-teal-50 px-5 py-4"><h3 className="font-semibold text-[#103746]">{session.title}</h3>{session.description&&<p className="mt-1 text-sm text-slate-600">{session.description}</p>}</div><div className="overflow-x-auto"><table className="w-full min-w-[560px] text-sm"><thead className="border-b text-left text-xs uppercase text-slate-500"><tr><th className="p-3">Item</th><th className="p-3">Qty</th><th className="p-3">Unit</th><th className="p-3 text-right">Amount</th></tr></thead><tbody>{session.items.map((item)=><tr key={item.id} className="border-b"><td className="p-3">{item.description}</td><td className="p-3">{item.quantity}</td><td className="p-3">{item.unit}</td><td className="p-3 text-right">{money(item.lineTotal,invoice.currency)}</td></tr>)}</tbody></table></div><div className="space-y-1 bg-teal-50 px-5 py-3 text-right text-sm text-[#103746]"><p>Session subtotal: <b>{money(session.subtotal,invoice.currency)}</b></p><p>Discount: <b>-{money(session.discountAmount,invoice.currency)}</b></p><p>VAT / Tax: <b>{money(session.taxAmount,invoice.currency)}</b></p><p className="border-t border-teal-200 pt-2 font-bold">NET SESSION TOTAL: {money(session.netTotal,invoice.currency)}</p></div>{session.notes&&<p className="px-5 py-3 text-sm text-slate-600">{session.notes}</p>}</div></Card>)}</div></Section><Section title="Timeline"><InvoiceTimeline/></Section>{invoice.quotationId&&<Section title="Related Quotation"><Card><button className="text-[#103746]" onClick={()=>n(`/quotations/${invoice.quotationId}`)}>View source quotation</button></Card></Section>}</div>}
