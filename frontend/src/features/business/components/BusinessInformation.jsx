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

      <div className="mt-8 border-t pt-6">
        <h3 className="mb-4 text-lg font-semibold">Payment / Bank Details</h3>
        {business.paymentAccounts?.length ? <div className="grid gap-3 md:grid-cols-2">{business.paymentAccounts.map((account) => <div key={account.id} className="rounded-lg border border-slate-200 p-4"><div className="flex justify-between gap-2"><b>{account.bankName || "Bank account"}</b>{account.isPrimary && <span className="text-xs font-semibold text-emerald-700">PRIMARY</span>}</div><p className="mt-3 text-sm text-slate-500">Account Name</p><p className="font-medium">{account.accountName || "-"}</p><p className="mt-3 text-sm text-slate-500">Account Number</p><p className="font-medium">{account.accountNumber || "-"}</p></div>)}</div> : <p className="text-sm text-slate-500">No payment accounts have been added.</p>}
      </div>

    </div>
  );
}
