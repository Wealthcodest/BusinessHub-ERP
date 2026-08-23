import { Avatar } from "@/components/ui";
export default function CustomerAvatar({ customer, size = "md" }) { return <Avatar src={customer.avatar} name={customer.displayName || `${customer.firstName} ${customer.lastName}`} size={size} />; }
