import { Plus } from "lucide-react";
import { Button } from "@/components/ui";
export default function AddSessionButton({ onClick, label = "Add Session" }) { return <Button type="button" onClick={onClick}><Plus className="mr-2 inline h-4 w-4" />{label}</Button>; }
