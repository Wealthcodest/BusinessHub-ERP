import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Card } from "@/components/ui";

import {
  BusinessToolbar,
  BusinessTable,
} from "../components";

import useBusinesses from "../hooks/useBusinesses";

export default function BusinessPage() {
  const navigate = useNavigate();

  const {
    businesses,
    loading,
  } = useBusinesses();

  const [search, setSearch] = useState("");

  const filteredBusinesses = businesses.filter((business) =>
    business.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        Loading Businesses...
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Page Header */}

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

      {/* Business List */}

      <Card>

        <BusinessToolbar
          search={search}
          setSearch={setSearch}
          onCreate={() => navigate("/businesses/new")}
        />

        <BusinessTable
          businesses={filteredBusinesses}
        />

      </Card>

    </div>
  );
}