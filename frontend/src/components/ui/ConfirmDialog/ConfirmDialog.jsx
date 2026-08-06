import Button from "../Button";
import Modal, {
  ModalBody,
  ModalFooter,
} from "../Modal";

export default function ConfirmDialog({
  open,
  title = "Confirm Action",
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  danger = false,
  onConfirm,
  onCancel,
}) {
  return (
    <Modal
      open={open}
      title={title}
      onClose={onCancel}
      size="sm"
    >
      <ModalBody>

        <p className="text-slate-600">
          {message}
        </p>

      </ModalBody>

      <ModalFooter>

        <Button
          variant="outline"
          onClick={onCancel}
        >
          {cancelText}
        </Button>

        <Button
          variant={danger ? "danger" : "primary"}
          onClick={onConfirm}
        >
          {confirmText}
        </Button>

      </ModalFooter>

    </Modal>
  );
}