import Button from "@/components/ui/Button";

export default function BusinessActions({
  onView,
  onEdit,
  onDelete,
}) {
  return (
    <div className="flex items-center gap-2">

      <Button
        variant="ghost"
        size="sm"
        onClick={onView}
      >
        View
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={onEdit}
      >
        Edit
      </Button>

      <Button
        variant="danger"
        size="sm"
        onClick={onDelete}
      >
        Delete
      </Button>

    </div>
  );
}