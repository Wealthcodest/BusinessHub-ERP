export default function BusinessInformation({
  business,
}) {
  const Item = ({ label, value }) => (
    <div>
      <p className="text-sm text-slate-500">
        {label}
      </p>

      <p className="mt-1 font-medium">
        {value || "-"}
      </p>
    </div>
  );

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-xl font-semibold">
        Business Information
      </h2>

      <div className="grid grid-cols-2 gap-6">

        <Item
          label="Owner"
          value={business.owner}
        />

        <Item
          label="Industry"
          value={business.industry}
        />

        <Item
          label="Email"
          value={business.email}
        />

        <Item
          label="Phone"
          value={business.phone}
        />

        <Item
          label="Website"
          value={business.website}
        />

        <Item
          label="Currency"
          value={business.currency}
        />

        <Item
          label="Country"
          value={business.country}
        />

        <Item
          label="Created"
          value={business.createdAt}
        />

      </div>

    </div>
  );
}