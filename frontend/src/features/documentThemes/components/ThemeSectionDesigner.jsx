import { GripVertical, Eye, EyeOff } from "lucide-react";

const sectionDefinitions = [
  { id: "branding", label: "Branding / Header" },
  { id: "documentMeta", label: "Document Metadata" },
  { id: "customer", label: "Customer Information" },
  { id: "sessions", label: "Sessions / Items" },
  { id: "totals", label: "Totals" },
  { id: "payment", label: "Payment Information" },
  { id: "notes", label: "Notes / Terms" },
  { id: "footer", label: "Footer" },
];

const sectionMap = Object.fromEntries(sectionDefinitions.map((section) => [section.id, section]));

export default function ThemeSectionDesigner({ sectionOrder = [], sections = {}, selectedSection, onSelect, onToggleVisibility, onReorder }) {
  const orderedSections = sectionOrder
    .map((sectionId) => ({ ...sectionMap[sectionId], ...(sections[sectionId] || {}), visible: sections[sectionId]?.visible !== false, id: sectionId }))
    .filter((section) => sectionMap[section.id]);

  const handleDrop = (targetId) => (event) => {
    event.preventDefault();
    const sourceId = event.dataTransfer.getData("text/plain");
    if (!sourceId || sourceId === targetId) return;
    onReorder?.(sourceId, targetId);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-700">Document Sections</h3>
        <span className="text-xs text-slate-500">Drag to reorder</span>
      </div>

      <div className="space-y-2">
        {orderedSections.map((section) => {
          const isSelected = selectedSection === section.id;
          const isVisible = section.visible !== false;

          return (
            <div
              key={section.id}
              draggable
              onDragStart={(event) => {
                event.dataTransfer.effectAllowed = "move";
                event.dataTransfer.setData("text/plain", section.id);
              }}
              onDragOver={(event) => event.preventDefault()}
              onDrop={handleDrop(section.id)}
              onClick={() => onSelect?.(section.id)}
              className={`flex cursor-grab items-center gap-3 rounded-xl border p-3 transition ${isSelected ? "border-[#103746] bg-teal-50 shadow-sm ring-2 ring-teal-100" : "border-slate-200 bg-white hover:border-slate-300"}`}
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-500" aria-label={`Drag ${section.label}`}>
                <GripVertical className="h-4 w-4" />
              </span>

              <div className="min-w-0 flex-1">
                <div className="font-medium text-slate-800">{section.label}</div>
                <div className="text-xs text-slate-500">{isVisible ? "Visible" : "Hidden"}</div>
              </div>

              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  onToggleVisibility?.(section.id, !isVisible);
                }}
                className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${isVisible ? "bg-slate-100 text-slate-700" : "bg-slate-200 text-slate-500"}`}
                aria-label={`${isVisible ? "Hide" : "Show"} ${section.label}`}
              >
                {isVisible ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
                {isVisible ? "Visible" : "Hidden"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
