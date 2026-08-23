import { Textarea } from "@/components/ui";
export default function SessionDescription({ value, onChange }) { return <div className="px-4 pt-4"><Textarea rows={2} value={value || ""} onChange={(event) => onChange(event.target.value)} placeholder="Description (optional)" aria-label="Session description" /></div>; }
