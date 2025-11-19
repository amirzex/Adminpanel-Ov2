import React from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";

const UserEditModal = ({ isOpen, toggle, children }) => {
  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      className="modal-dialog-centered modal-lg"
    >
      <ModalHeader className="bg-transparent" toggle={toggle}></ModalHeader>
      <ModalBody>{children}</ModalBody>
    </Modal>
  );
};

export default UserEditModal;
