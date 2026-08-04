import {
  Building2,
  Users,
  FileText,
  DollarSign,
} from "lucide-react";

import StatCard from "../components/StatCard";

export default function DashboardPage() {
  return (
    <div>

      <div className="mb-8">

        <h1 className="text-4xl font-bold">
          Dashboard
        </h1>

        <p className="text-slate-500 mt-2">
          Welcome back, Administrator
        </p>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <StatCard
          title="Businesses"
          value="0"
          icon={Building2}
          color="bg-sky-600"
        />

        <StatCard
          title="Customers"
          value="0"
          icon={Users}
          color="bg-emerald-600"
        />

        <StatCard
          title="Invoices"
          value="0"
          icon={FileText}
          color="bg-orange-500"
        />

        <StatCard
          title="Revenue"
          value="₦0"
          icon={DollarSign}
          color="bg-purple-600"
        />

      </div>

    </div>
  );
}