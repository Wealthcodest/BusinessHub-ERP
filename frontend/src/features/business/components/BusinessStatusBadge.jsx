import { Badge } from "@/components/ui";

export default function BusinessStatusBadge({ status }) {

    const color =
        status === "active"
            ? "green"
            : status === "inactive"
            ? "red"
            : "gray";

    return (
        <Badge color={color}>
            {status.toUpperCase()}
        </Badge>
    );
}