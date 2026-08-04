import { Input } from "@/components/ui";

export default function BusinessSearch({
    value,
    onChange,
}) {
    return (
        <div className="w-96">
            <Input
                placeholder="Search businesses..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
}