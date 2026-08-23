import { Plus } from "lucide-react";
import { Button } from "@/components/ui";
export default function AddSessionButton({ onClick }) { return <Button type="button" onClick={onClick}><Plus className="mr-2 inline h-4 w-4" />Add Session</Button>; }
