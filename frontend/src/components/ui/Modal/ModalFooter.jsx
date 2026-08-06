export default function ModalFooter({
  children,
}) {
  return (
    <div className="flex justify-end gap-3 border-t p-5">
      {children}
    </div>
  );
}