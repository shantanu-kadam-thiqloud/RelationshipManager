// src/components/ForgotPasswordModal.js
import React from "react";
import Modal from "react-modal";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import RestDataSource from "../services/API-request";
import { toast } from "react-toastify";

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

const ForgotPasswordModal = ({ isOpen, onRequestClose }) => {
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

const navigate = useNavigate(); 

const handleSubmit = (values, { resetForm }) => {
  const api = new RestDataSource();
  const payload = {
    email: values.email,
    operation: "ForgotPassword"
  };

  api.PostData(process.env.REACT_APP_API_URL + "/services/apexrest/portaluser", (response) => {
    if (response && response.data) {
      toast.success("Password sent to your registered email");
      navigate("/");
      resetForm();
      onRequestClose();
    }
  }, payload);
};


  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
      <div className="textright">
        <i className="fa-solid fa-xmark" onClick={onRequestClose} ></i>
      </div>

      <h5 className="titleText">Forgot Password</h5>
      <p className="textmuted mb-3">
        Enter your email & we’ll send you a link to reset your password.
      </p>

      <Formik
        initialValues={{ email: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}        
      >
        {({ values,handleChange, handleSubmit, errors, touched }) => (
          <form onSubmit={handleSubmit} className="login-box">
            <div className="mb-3">
              <label className="form-label"> <i className="fa-solid fa-envelope mr10"></i> Email Address</label>
              <input
                name="email"
                type="email"
                className={`form-control ${touched.email && errors.email ? "is-invalid" : ""}`}
                placeholder="ex.alexander.pierce@gmail.com"
                value={values.email}
                onChange={handleChange}
              />
              {touched.email && errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </div>

            <button type="submit" className="btn btn-primary loginbtn w-100">
              RESET PASSWORD
            </button>
            <button
              type="button"
              className="btn btn-link mt-2 text-muted w-100"
              onClick={onRequestClose}
            >

            </button>
            <div className="text-center">
              <span onClick={onRequestClose} className="backbtn"><i className="fa-solid fa-arrow-left mr10"></i> Back to Login</span>
            </div>
          </form>
        )}
      </Formik>
    </Modal>
  );
};

export default ForgotPasswordModal;
