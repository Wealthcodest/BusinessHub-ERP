import { useNavigate } from "react-router-dom";
import Button from "@/components/ui/Button";

export default function BusinessQuickActions({ businessId }) {
  const navigate = useNavigate();

  const actions = [
    {
      label: "New Customer",
      onClick: () => navigate(`/customers/new?business=${businessId}`),
    },
    {
      label: "New Product",
      onClick: () => navigate(`/products/new?business=${businessId}`),
    },
    {
      label: "New Invoice",
      onClick: () => navigate(`/invoices/new?business=${businessId}`),
    },
    {
      label: "Document Themes",
      onClick: () => navigate(`/businesses/${businessId}/themes`),
    },
    {
      label: "View Reports",
      onClick: () => navigate(`/reports?business=${businessId}`),
    },
  ];

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-xl font-semibold">
        Quick Actions
      </h2>

      <div className="grid grid-cols-2 gap-4">
        {actions.map((action) => (
          <Button
            key={action.label}
            onClick={action.onClick}
          >
            {action.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
