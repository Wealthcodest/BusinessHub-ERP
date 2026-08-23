import { useNavigate } from "react-router-dom";

import { Card } from "@/components/ui";
import { useToast } from "@/components/ui";

import { BusinessTable } from "../components";

import useBusinesses from "../hooks/useBusinesses";
import { businessService } from "../services/businessService";

export default function BusinessPage() {
  const navigate = useNavigate();
  const toast = useToast();

  const {
    businesses,
    loading,
    refreshBusinesses,
  } = useBusinesses();

  async function handleDelete(id, name) {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${name}"?`
    );

    if (!confirmed) return;

    try {
      await businessService.delete(id);

      await refreshBusinesses();

      toast.success("Business deleted successfully.");
    } catch (error) {
      console.error(error);

      toast.error("Unable to delete business.");
    }
  }

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold text-slate-800">
            Business Management
          </h1>

          <p className="mt-1 text-slate-500">
            Manage all businesses within your ERP.
          </p>

        </div>

      </div>

      <Card>

        <BusinessTable
          businesses={businesses}
          loading={loading}
          onCreate={() => navigate("/businesses/new")}
          onView={(business) => navigate(`/businesses/${business.id}`)}
          onEdit={(business) => navigate(`/businesses/${business.id}/edit`)}
          onDelete={handleDelete}
        />

      </Card>

    </div>
  );
}
