import Avatar from "./Avatar";

export default function AvatarGroup({ users, max = 4, size = "sm" }) {
  const visibleUsers = users.slice(0, max);
  const remaining = users.length - visibleUsers.length;
  return <div className="flex -space-x-2">{visibleUsers.map((user) => <Avatar key={user.id || user.name} src={user.src} name={user.name} size={size} className="ring-2 ring-white" />)}{remaining > 0 && <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-xs font-medium text-slate-600 ring-2 ring-white">+{remaining}</div>}</div>;
}
