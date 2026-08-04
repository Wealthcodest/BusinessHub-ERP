const stats = [
  {
    title: "Customers",
    value: 0,
  },
  {
    title: "Products",
    value: 0,
  },
  {
    title: "Inventory",
    value: 0,
  },
  {
    title: "Invoices",
    value: 0,
  },
  {
    title: "Revenue",
    value: "₦0.00",
  },
];

export default function BusinessStatistics() {
  return (
    <div className="grid grid-cols-5 gap-5">

      {stats.map((item) => (
        <div
          key={item.title}
          className="rounded-xl border bg-white p-5 shadow-sm"
        >
          <p className="text-sm text-slate-500">
            {item.title}
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {item.value}
          </h2>

        </div>
      ))}

    </div>
  );
}