import ActivityItem from "./ActivityItem";

export default function ActivityList({ items, emptyMessage = "No recent activity." }) {
  return <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">{items.length ? <ul className="divide-y divide-slate-100">{items.map((item, index) => <ActivityItem key={item.id || `${item.title}-${index}`} {...item} />)}</ul> : <p className="py-8 text-center text-sm text-slate-500">{emptyMessage}</p>}</div>;
}
