import React from "react";
import Modal from "react-modal";
import { Formik, Form, Field, ErrorMessage } from "formik";
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

const EditContactModal = ({ isOpen, onRequestClose }) => {
  const validationSchema = Yup.object({
    fullName: Yup.string().required("Full Name is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    phone: Yup.string()
      .matches(/^\+91\s?\d{10}$/, "Enter a valid Indian phone number")
      .required("Phone number is required"),
    city: Yup.string().required("City is required"),
    status: Yup.string().oneOf(["Active", "Inactive"]).required("Status is required"),
  });

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add Contact"      
      style={customStyles}
    >
      <div className="modal-header">
        <h2>Edit Contact</h2>
        <button className="close-btn" onClick={onRequestClose}>
          ×
        </button>
      </div>

      <Formik
        initialValues={{
          fullName: "",
          email: "",
          phone: "",
          city: "",
          status: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          //onSubmit(values);
          resetForm();
          onRequestClose();
        }}
      >
        {() => (
          <Form className="modal-form">
            <label>Full Name</label>
            <Field name="fullName" className="form-input" />
            <ErrorMessage name="fullName" component="div" className="form-error" />

            <label>Email Address</label>
            <Field name="email" type="email" className="form-input" />
            <ErrorMessage name="email" component="div" className="form-error" />

            <label>Phone Number</label>
            <Field name="phone" className="form-input" placeholder="+91 9096357565" />
            <ErrorMessage name="phone" component="div" className="form-error" />

            <div className="form-row">
              <div>
                <label>City</label>
                <Field as="select" name="city" className="form-select">
                  <option value="">Select</option>
                  <option value="Pune">Pune</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Nagpur">Nagpur</option>
                  <option value="Nashik">Nashik</option>
                </Field>
                <ErrorMessage name="city" component="div" className="form-error" />
              </div>

              <div>
                <label>Status</label>
                <Field as="select" name="status" className="form-select">
                  <option value="">Select</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </Field>
                <ErrorMessage name="status" component="div" className="form-error" />
              </div>
            </div>

            <div className="modal-actions">
              <button type="submit" className="btn-add">
                Update
              </button>
              <button type="button" className="btn-cancel" onClick={onRequestClose}>
                CANCEL
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default EditContactModal;
