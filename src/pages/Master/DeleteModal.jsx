import React from "react";
import { Modal, Button } from "react-bootstrap";
import "./Master.css";

const DeleteModal = ({ show, onClose, onConfirm }) => {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton className="custom-modal-header">
        <Modal.Title>Delete</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Are you sure you want to delete this data?</p>
      </Modal.Body>

      <Modal.Footer className="no-border">
        <button className="btn-dlt-modal" onClick={onClose}>
          Cancel
        </button>
        <button className="btn-delete" onClick={onConfirm}>
          Delete
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;
