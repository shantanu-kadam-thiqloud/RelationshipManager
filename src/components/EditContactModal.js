import React, { useState } from "react";
import Modal from "react-modal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import RestDataSource from "../services/API-request";
import Spinner from "../CommonComponents/Spinner";
import { toast } from "react-toastify";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    maxHeight: "90vh", // limits modal height
    overflowY: "auto", // enables vertical scroll
    width: "900px",
    transform: "translate(-50%, -50%)",
    padding: "30px",
    borderRadius: "4px",
  },
};


Modal.setAppElement("#root");


const EditContactModal = ({ isOpen, onRequestClose, selectedRow }) => {
  const [isLoading, setIsLoading] = useState(false);
  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    middleName: Yup.string(), // optional
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    phone: Yup.string()
      .matches(/^\d{10}$/, "Enter a valid 10-digit phone number")
      .required("Phone number is required"),
    city: Yup.string().required("City is required"),
    status: Yup.string().oneOf(["Active", "Inactive"]).required("Status is required"),
  });

  const handleSubmit = (values) => {
    setIsLoading(true);
    const api = new RestDataSource();

    const payload = {
      "FirstName": values.firstName,
      "MiddleName": values.middleName,
      "LastName": values.lastName,
      "PersonMobilePhone": values.phone,
      "PersonMailingCity": values.city,
      "Email__c": values.email,
      "Status__c": values.status
    };

    api.Update(
      process.env.REACT_APP_API_URL + "/services/data/v64.0/sobjects/Account/" + selectedRow.id,
      (response) => {
        if (response && response.status === 204) {
          toast.success("Contact Updated Successfully");
        }
      },
      payload
    );
    setIsLoading(false);
  }

  return (
    <><Spinner isLoading={isLoading} />
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
            firstName: selectedRow?.firstName || "",
            middleName: selectedRow?.middleName || "",
            lastName: selectedRow?.lastName || "",
            email: selectedRow?.email || "",
            phone: selectedRow?.phone || "",
            city: selectedRow?.city || "",
            status: selectedRow?.status || "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            handleSubmit(values);
            resetForm();
            onRequestClose();
          }}
        >
          {() => (
            <Form className="modal-form add-new-contact">
              <div className="row">
                <div className="col-md-4">
                  <div class="mb-3">
                    <label>First Name</label>
                    <Field name="firstName" className="form-control" placeholder="ex. Vinit" />
                    <ErrorMessage name="firstName" component="div" className="form-error" />
                  </div>
                </div>
                <div className="col-md-4">
                  <div class="mb-3">
                    <label>Middle Name</label>
                    <Field name="middleName" className="form-control" placeholder="ex. Amar" />
                    <ErrorMessage name="middleName" component="div" className="form-error" />
                  </div>
                </div>
                <div className="col-md-4">
                  <div class="mb-3">
                    <label>Last Name</label>
                    <Field name="lastName" className="form-control" placeholder="ex. Patil" />
                    <ErrorMessage name="lastName" component="div" className="form-error" />
                  </div>
                </div>
                <div className="col-md-4">
                  <div class="mb-3">
                    <label>Email Address</label>
                    <Field name="email" type="email" className="form-control" placeholder="ex.vinit.patil@gmail.com" />
                    <ErrorMessage name="email" component="div" className="form-error" />
                  </div>
                </div>
                <div className="col-md-4">
                  <div class="mb-3">
                    <label>Phone Number</label>
                    <Field name="phone" className="form-control" placeholder="ex.+91 9096357565" />
                    <ErrorMessage name="phone" component="div" className="form-error" />
                  </div>
                </div>


                <div className="col-md-4">
                  <div class="mb-3">
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
                </div>
                <div className="col-md-4">
                  <div class="mb-3">
                    <label className="form-label">Status</label>
                    <Field as="select" name="status" className="form-select">
                      <option value="">Select</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </Field>
                    <ErrorMessage name="status" component="div" className="form-error" />
                  </div>
                </div>

              </div>

              <div className="text-end mt-4">
                <button type="submit" className="btn btn-primary submitBtn common-btn2 mr10">
                  Update
                </button>
                <button type="button" className="btn btn-secondary submitBtn common-btn2" onClick={onRequestClose}>
                  Cancel
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default EditContactModal;
