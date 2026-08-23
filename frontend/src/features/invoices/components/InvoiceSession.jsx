import { Card } from "@/components/ui";
import InvoiceSessionHeader from "./InvoiceSessionHeader";
import InvoiceSessionItems from "./InvoiceSessionItems";
import InvoiceSessionSubtotal from "./InvoiceSessionSubtotal";
export default function InvoiceSession({ session, index, count, currency, collapsed, onChange, onItemChange, onAddItem, onRemoveItem, ...toolbar }) { return <Card><div className="-m-6"><InvoiceSessionHeader session={session} index={index} count={count} collapsed={collapsed} onChange={onChange} {...toolbar} />{!collapsed && <><InvoiceSessionItems items={session.items} currency={currency} onChange={onItemChange} onAdd={onAddItem} onRemove={onRemoveItem} /><InvoiceSessionSubtotal subtotal={session.subtotal} currency={currency} /></>}</div></Card>; }
