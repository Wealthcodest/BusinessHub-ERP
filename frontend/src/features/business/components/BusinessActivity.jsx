const activities = [
  {
    title: "Business created",
    date: "Today",
  },
  {
    title: "Logo uploaded",
    date: "Today",
  },
];

export default function BusinessActivity() {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">

      <h2 className="mb-5 text-xl font-semibold">
        Recent Activity
      </h2>

      <div className="space-y-4">

        {activities.map((activity, index) => (
          <div
            key={index}
            className="border-l-4 border-[#18566E] pl-4"
          >
            <p className="font-medium">
              {activity.title}
            </p>

            <p className="text-sm text-slate-500">
              {activity.date}
            </p>
          </div>
        ))}

      </div>

    </div>
  );
}