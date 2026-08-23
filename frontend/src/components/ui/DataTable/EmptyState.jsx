import { Inbox } from "lucide-react";

import Button from "../Button";

export default function EmptyState({
  icon: Icon = Inbox,
  title = "No records found",
  description = "There are no records to display.",
  primaryAction,
}) {
  return (
    <div className="flex min-h-72 flex-col items-center justify-center px-6 py-12 text-center">
      <div className="mb-4 rounded-full bg-slate-100 p-3 text-slate-500">
        <Icon aria-hidden="true" className="h-6 w-6" />
      </div>
      <h3 className="text-base font-semibold text-slate-800">{title}</h3>
      <p className="mt-1 max-w-sm text-sm leading-6 text-slate-500">{description}</p>
      {primaryAction && <Button type="button" onClick={primaryAction.onClick} className="mt-5">{primaryAction.label}</Button>}
    </div>
  );
}
