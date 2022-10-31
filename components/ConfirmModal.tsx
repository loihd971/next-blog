import React from "react";
import { Modal, Button, Text, Input, Row, Checkbox } from "@nextui-org/react";

export default function ConfirmModal({
  visible,
  onClose,
  onSubmit,
  children,
  title,
}: any) {
  return (
    <Modal
      closeButton
      preventClose
      aria-labelledby="modal-title"
      open={visible}
      onClose={onClose}
    >
      <Modal.Header>
        <Text id="modal-title" size={18}>
          {title}
        </Text>
      </Modal.Header>
      <Modal.Body >{children}</Modal.Body>
      <Modal.Footer>
        <Button auto flat color="error" onClick={onClose}>
          Cancel
        </Button>
        <Button auto onClick={onSubmit}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
