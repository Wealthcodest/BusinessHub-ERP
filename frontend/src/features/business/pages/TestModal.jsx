import { useState } from "react";

import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
} from "@/components/ui";

export default function TestModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        Open Modal
      </Button>

      <Modal
        open={open}
        title="BusinessHub ERP"
        onClose={() => setOpen(false)}
      >
        <ModalBody>

          This is our reusable modal.

        </ModalBody>

        <ModalFooter>

          <Button
            variant="outline"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>

          <Button
            onClick={() => setOpen(false)}
          >
            Save
          </Button>

        </ModalFooter>

      </Modal>
    </>
  );
}