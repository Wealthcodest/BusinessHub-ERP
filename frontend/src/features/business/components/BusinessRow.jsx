import { useNavigate } from "react-router-dom";

import { BusinessStatusBadge } from ".";
import { BusinessActions } from ".";

export default function BusinessRow({ business }) {
  const navigate = useNavigate();

  return (
    <tr className="border-b hover:bg-slate-50 transition-colors">

      <td className="px-4 py-4 font-medium">
        {business.name}
      </td>

      <td className="px-4 py-4">
        {business.industry}
      </td>

      <td className="px-4 py-4">
        {business.owner}
      </td>

      <td className="px-4 py-4">
        <BusinessStatusBadge
          status={business.status}
        />
      </td>

      <td className="px-4 py-4">
        {business.createdAt}
      </td>

      <td className="px-4 py-4">

        <BusinessActions

          onView={() =>
            navigate(`/businesses/${business.id}`)
          }

          onEdit={() =>
            navigate(`/businesses/${business.id}/edit`)
          }

          onDelete={() =>
            console.log("Delete", business.id)
          }

        />

      </td>

    </tr>
  );
}