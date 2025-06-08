import React, {useEffect, useState} from "react";
import { toast } from "react-toastify";
import Spinner from "../CommonComponents/Spinner";
import loginImage from "../Assets/Images/LoginPage.png";
import Logo from "../Assets/Images/Logo.png"
import ForgotPasswordModal from "./ForgotPasswordModal";

const Login = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [showForgotModal, setShowForgotModal] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        
        setIsLoading(false); 
      }, []); 
  return (  
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center">
       <Spinner isLoading={isLoading} /> 
      <div className="row w-100 shadow-lg" style={{ maxWidth: "900px" }}>
        {/* Left Image Side */}
        <div className="col-lg-6 d-none d-lg-block p-0">
          <img
            src={loginImage}
            alt="Handshake"
            className="img-fluid h-100 w-100 object-fit-cover"
            style={{ objectFit: "cover" }}
          />
        </div>

        {/* Right Form Side */}
        <div className="col-12 col-lg-6 bg-white p-5">
          <div className="text-center mb-4">
            <img
              src={Logo}
              alt="Logo"
              className="img-fluid"
              style={{ maxHeight: "60px" }}
            />           
          </div>
        <div>
        <div className="mt-3 welcomeText">Welcome to,</div>
        <div className="titleText mb-3">Login RM Portal</div>
        </div>
          <form>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="alexander.pierce@gmail.com"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="••••••••"
              />
              <div className="text-end mt-2">
                <button
                  type="button"
                  className="btn btn-link text-decoration-none p-0"
                  onClick={() => setShowForgotModal(true)}
                >
                  Forgot Password?
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-100 submitBtn mt-3">
              LOGIN
            </button>
          </form>

          <footer className="text-center mt-4 text-muted" style={{ fontSize: "0.9rem" }}>
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
