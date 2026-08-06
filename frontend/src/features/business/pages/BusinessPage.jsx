import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Card } from "@/components/ui";

import {
  BusinessToolbar,
  BusinessTable,
} from "../components";

import useBusinesses from "../hooks/useBusinesses";
import { businessService } from "../services/businessService";

export default function BusinessPage() {
  const navigate = useNavigate();

  const {
    businesses,
    loading,
    refreshBusinesses,
  } = useBusinesses();

  const [search, setSearch] = useState("");

  const filteredBusinesses = businesses.filter((business) =>
    business.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  async function handleDelete(id, name) {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${name}"?`
    );

    if (!confirmed) return;

    try {
      await businessService.delete(id);

      await refreshBusinesses();

      alert("Business deleted successfully.");
    } catch (error) {
      console.error(error);

      alert("Unable to delete business.");
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        Loading Businesses...
      </div>
    );
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

        <BusinessToolbar
          search={search}
          setSearch={setSearch}
          onCreate={() => navigate("/businesses/new")}
        />

        <BusinessTable
          businesses={filteredBusinesses}
          onDelete={handleDelete}
        />

      </Card>

    </div>
  );
}