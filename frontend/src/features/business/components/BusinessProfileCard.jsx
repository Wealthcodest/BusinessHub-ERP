import Button from "@/components/ui/Button";

export default function BusinessProfileCard({
  business,
  onEdit,
}) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">

      <div className="flex items-start justify-between">

        <div className="flex gap-5">

          <div className="h-24 w-24 overflow-hidden rounded-xl border bg-slate-100">

            {business.logo ? (
              <img
                src={business.logo}
                alt={business.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-3xl font-bold text-slate-500">
                {business.name.charAt(0)}
              </div>
            )}

          </div>

          <div>

            <h1 className="text-3xl font-bold text-slate-800">
              {business.name}
            </h1>

            <p className="mt-1 text-slate-500">
              {business.industry}
            </p>

            <span
              className={`mt-4 inline-flex rounded-full px-3 py-1 text-sm font-medium ${
                business.status === "active"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {business.status}
            </span>

          </div>

        </div>

        <Button
          onClick={onEdit}
        >
          Edit Business
        </Button>

      </div>

    </div>
  );
}