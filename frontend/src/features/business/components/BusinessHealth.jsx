export default function BusinessHealth() {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">

      <h2 className="mb-5 text-xl font-semibold">
        Business Health
      </h2>

      <div className="space-y-3">

        <HealthRow
          label="Profile Completion"
          value="70%"
        />

        <HealthRow
          label="Customers"
          value="0"
        />

        <HealthRow
          label="Products"
          value="0"
        />

        <HealthRow
          label="Invoices"
          value="0"
        />

      </div>

    </div>
  );
}

function HealthRow({ label, value }) {
  return (
    <div className="flex justify-between border-b pb-2">
      <span>{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}