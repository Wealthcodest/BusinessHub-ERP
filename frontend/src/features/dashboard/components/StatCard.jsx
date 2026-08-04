import { TrendingUp } from "lucide-react";

export default function StatCard({
  title,
  value,
  icon: Icon,
  color = "bg-blue-600",
}) {
  return (
    <div className="rounded-2xl bg-white shadow-sm border p-6">
      <div className="flex justify-between items-center">

        <div>
          <p className="text-sm text-slate-500">{title}</p>

          <h2 className="text-3xl font-bold mt-2">
            {value}
          </h2>
        </div>

        <div className={`${color} rounded-xl p-4 text-white`}>
          <Icon size={28} />
        </div>

      </div>

      <div className="flex items-center gap-2 mt-6 text-green-600 text-sm">
        <TrendingUp size={16} />
        Growing
      </div>
    </div>
  );
}