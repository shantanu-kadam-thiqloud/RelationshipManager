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
    width: "433px",
    transform: "translate(-50%, -50%)",
    padding: "30px",
    borderRadius: "4px",

  },
};

Modal.setAppElement("#root");

const ResetPasswordModel = ({ isOpen, onRequestClose }) => {
  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("New Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });


  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
      <div className="textright">
        <i class="fa-solid fa-xmark" onClick={onRequestClose} ></i>
      </div>
      <h5 className="titleText">Reset Password</h5>
      <p className="textmuted1 mb-3">
        shantanu.kadam@thinqloud.com
      </p>

      <Formik
        initialValues={{ password: "", confirmPassword: "" }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          console.log("Password reset with:", values.password);
          resetForm();
          onRequestClose(); // Close the modal/dialog
        }}
      >
        {({ values, handleChange, handleSubmit, errors, touched }) => (
          <form onSubmit={handleSubmit} className="login-box">
            <div className="mb-3">
              <label className="form-label">
                <i className="fa-solid fa-lock mr10"></i> New Password
              </label>
              <input
                name="password"
                type="password"
                className={`form-control ${touched.password && errors.password ? "is-invalid" : ""
                  }`}
                placeholder="Enter New Password"
                value={values.password}
                onChange={handleChange}
              />
              {touched.password && errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">
                <i className="fa-solid fa-lock mr10"></i> Confirm Password
              </label>
              <input
                name="confirmPassword"
                type="password"
                className={`form-control ${touched.confirmPassword && errors.confirmPassword
                  ? "is-invalid"
                  : ""
                  }`}
                placeholder="Confirm New Password"
                value={values.confirmPassword}
                onChange={handleChange}
              />
              {touched.confirmPassword && errors.confirmPassword && (
                <div className="invalid-feedback">{errors.confirmPassword}</div>
              )}
            </div>

            <button type="submit" className="btn btn-primary loginbtn w-100">
              SET NEW PASSWORD
            </button>
          </form>
        )}
      </Formik>
    </Modal>
  );
};

export default ResetPasswordModel;
