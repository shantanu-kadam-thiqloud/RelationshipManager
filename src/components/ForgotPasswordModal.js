// src/components/ForgotPasswordModal.js
import React from "react";
import Modal from "react-modal";
import { Formik } from "formik";
import * as Yup from "yup";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    width: "400px",
    transform: "translate(-50%, -50%)",
    padding: "30px",
    borderRadius: "10px",
  },
};

Modal.setAppElement("#root");

const ForgotPasswordModal = ({ isOpen, onRequestClose }) => {
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0">Forgot Password</h5>
        <button onClick={onRequestClose} className="btn btn-sm btn-light text-danger fw-bold">
          ✕
        </button>
      </div>
      <p className="text-muted mb-3">
        Enter your email & we’ll send you a link to reset your password.
      </p>

      <Formik
        initialValues={{ email: "" }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          console.log("Reset email sent to:", values.email);
          resetForm();
          onRequestClose();
        }}
      >
        {({ values, handleChange, handleSubmit, errors, touched }) => (
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Email Address</label>
              <input
                name="email"
                type="email"
                className={`form-control ${touched.email && errors.email ? "is-invalid" : ""}`}
                placeholder="alexander.pierce@gmail.com"
                value={values.email}
                onChange={handleChange}
              />
              {touched.email && errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </div>

            <button type="submit" className="btn btn-primary w-100">
              RESET PASSWORD
            </button>
            <button
              type="button"
              className="btn btn-link mt-2 text-muted w-100"
              onClick={onRequestClose}
            >
              ← Back to Login
            </button>
          </form>
        )}
      </Formik>
    </Modal>
  );
};

export default ForgotPasswordModal;
