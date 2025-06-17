import React from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    padding: "30px",
    width: "400px",
    borderRadius: "8px",
    textAlign: "center"
  }
};

Modal.setAppElement("#root");

const DeleteConfirmationModal = ({ isOpen, onRequestClose, onConfirm, contactName }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Delete Confirmation"
      style={customStyles}
    >
      <h4>Confirm Delete</h4>
      <p>Are you sure you want to delete <strong>{contactName}</strong>?</p>
      <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "20px" }}>
        <button className="btn btn-danger" onClick={onConfirm}>Yes</button>
        <button className="btn btn-secondary" onClick={onRequestClose}>No</button>
      </div>
    </Modal>
  );
};

export default DeleteConfirmationModal;
