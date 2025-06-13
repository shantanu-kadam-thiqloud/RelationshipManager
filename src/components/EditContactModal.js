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
    width: "433px",
    transform: "translate(-50%, -50%)",
    padding: "30px",
    borderRadius: "4px",
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
      <div className="textright">
        <i className="fa-solid fa-xmark" onClick={onRequestClose} ></i>
      </div>
      <h5 className="titleText">Edit Contact</h5>
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
          <Form className="modal-form add-new-contact">
            <label>Full Name</label>
            <Field name="fullName" className="form-control" placeholder="ex.Alexander Pierce" />
            <ErrorMessage name="fullName" component="div" className="form-error" />

            <label>Email Address</label>
            <Field name="email" type="email" className="form-control" placeholder="ex.alexander.pierce@gmail.com" />
            <ErrorMessage name="email" component="div" className="form-error" />

            <label>Phone Number</label>
            <Field name="phone" className="form-control" placeholder="ex.+91 9096357565" />
            <ErrorMessage name="phone" component="div" className="form-error" />
            <div className="row">
              <div className="col-md-6">
                <label className="form-label">City</label>
                <Field as="select" name="city" className="form-select">
                  <option value="">Select</option>
                  <option value="Pune">Pune</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Nagpur">Nagpur</option>
                  <option value="Nashik">Nashik</option>
                </Field>
                <ErrorMessage name="city" component="div" className="form-error" />
              </div>
              <div className="col-md-6">
                <label className="form-label">Status</label>
                <Field as="select" name="status" className="form-select">
                  <option value="">Select</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </Field>
                <ErrorMessage name="status" component="div" className="form-error" />
              </div>
            </div>
            <div className="text-end mt-4">
              <button type="submit" className="btn btn-primary submitBtn common-btn2 mr10">
                Update
              </button>
              <button type="submit" className="btn btn-primary submitBtn common-btn2" onClick={onRequestClose}>
                Cancel
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default EditContactModal;
