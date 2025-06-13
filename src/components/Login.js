import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Spinner from "../CommonComponents/Spinner";
import loginImage from "../Assets/Images/LoginPage.png";
import Logo from "../Assets/Images/Logo.png";
import ForgotPasswordModal from "./ForgotPasswordModal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import RestDataSource from "../services/API-request";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const navigate = useNavigate(); 

  useEffect(() => {
    setIsLoading(true);
    setIsLoading(false);
  }, []);

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = (values) => {
    console.log("Login submitted:", values);
    const api = new RestDataSource();
          
              const payload = {                
                  "loginId": values.email,
                  "password": values.password,
                  "operation": "Login"                
              };              
              api.PostData(process.env.REACT_APP_API_URL, (response) => {
                if (response && response.data) {
                  console.log("userdata - ",JSON.parse(response.data));
                  sessionStorage.setItem("userData", (response.data));
                  toast.success("Logged in successfully");
                  navigate("/dashboard");
                  //setUsrData(response.data);                  
                }
              }, payload);
    
  };

  return (
    <div className="container-fluid vh-100 align-items-center ">
      <Spinner isLoading={isLoading} />
      <div className="row">
        {/* Left Image Side */}
        <div className="col-lg-6 d-none d-lg-block p-0">
          <img
            src={loginImage}
            alt="Handshake"
            className="img-fluid h100 w-100"
            style={{ objectFit: "cover" }}
          />
        </div>

        {/* Right Form Side */}
        <div className="col-12 col-lg-6 bg-white p5">
          <div className=" mb4">
            <img
              src={Logo}
              alt="Logo"
              className="img-fluid"
              style={{ maxHeight: "60px" }}
            />
          </div>
          <div>
            <div className="mt-3 welcomeText">Welcome to,</div>
            <div className="titleText mb-4">Login RM Portal</div>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
              handleSubmit(values);
              resetForm();
            }}
          >
            {({ errors, touched }) => (
              <Form className="login-box">
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    <i className="fa-solid fa-envelope mr10"></i>Email Address
                  </label>
                  <Field
                    type="text"
                    className={`form-control ${touched.email && errors.email ? 'is-invalid' : ''}`}
                    id="email"
                    name="email"
                    placeholder="ex.alexander.pierce@gmail.com"
                  />
                  <ErrorMessage name="email" component="div" className="invalid-feedback" />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    <i className="fa-solid fa-lock mr10"></i>Password
                  </label>
                  <Field
                    type="password"
                    className={`form-control ${touched.password && errors.password ? 'is-invalid' : ''}`}
                    id="password"
                    name="password"
                    placeholder="••••••••"
                  />
                  <ErrorMessage name="password" component="div" className="invalid-feedback" />

                  <div className="text-end mt-2">
                    <button
                      type="button"
                      className="btn btn-link custom-btn"
                      onClick={() => setShowForgotModal(true)}
                    >
                      Forgot Password?
                    </button>
                  </div>
                </div>

                <button type="submit" className="btn btn-primary w-100 submitBtn loginbtn mt-3">
                  LOGIN
                </button>
              </Form>
            )}
          </Formik>

          <footer className="text-center mt-4 copyRight">
            Copyright © 2025 RM Portal. All rights reserved.
          </footer>
        </div>
      </div>

      {/* Forgot Password Modal */}
      <ForgotPasswordModal
        isOpen={showForgotModal}
        onRequestClose={() => setShowForgotModal(false)}
      />
    </div>
  );
};

export default Login;
