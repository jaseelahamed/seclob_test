import React, { useState } from "react";
import { Navigate,useNavigate } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider"; 
import "./login.css";
import emailIcon from "../../assets/img/mail.png";
import lockIcon from "../../assets/img/lock.png";
import { PATHS } from "../../constants/paths";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { Formik, Form } from "formik";
import { LoginValidationSchema } from "../../utils/authValidation";

const Login = () => {
  const { login } = useAuth();
  const isAuthenticated = localStorage.getItem("token");
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }
  const navigate = useNavigate();
  const loginMutation = useMutation({
    mutationFn: (values) => login(values),
    onSuccess: () => {
      toast.success("Logged in successfully");
      navigate(PATHS.BASE_PATH);
    },
    onError: (error) => {
      toast.error(error.message || "Login failed");
    },
  });

  const handleSubmit = (values) => {
    console.log("Submitting...", values);
    loginMutation.mutate(values);
  };

  return (
    <>
      <div className="container-fluid vh-100 d-flex">
        <div className="row flex-grow-1 w-100">
          {/* Login Form - col-md-5 (full width on mobile) */}
          <div className="col-12 col-md-7 d-flex align-items-center justify-content-center bg-white shadow">
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={LoginValidationSchema}
              onSubmit={handleSubmit}
            >
              {(formik) => (
                <Form className="w-75 my-5">
                  <div className="d-flex justify-content-center align-items-center ">
                    <h2
                      style={{
                        fontFamily: "Montserrat, sans-serif",
                        fontWeight: 700,
                        fontSize: "57.12px",
                        lineHeight: "100%",
                        letterSpacing: "0",
                        textAlign: "center",
                        width: "404px",
                        height: "140px",
                        color: "#EDA415",
                      }}
                    >
                      Sign In to Your Account
                    </h2>
                  </div>
                  <div className="d-flex  flex-column justify-content-center align-items-center ">
                    <style>
                      {`
    /* Placeholder color */
    ::placeholder {
      color: #9A9A9A;
      opacity: 1; /* for Firefox */
    }
  `}
                    </style>

                    <div className="mb-3">
                      <div
                        style={{
                          position: "relative",
                          width: "fit-content",
                          margin: "auto",
                        }}
                      >
                        {/* Email icon */}
                        <img
                          src={emailIcon}
                          alt="email icon"
                          style={{
                            position: "absolute",
                            left: "10px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            width: "24px",
                            height: "24px",
                            pointerEvents: "none",
                            opacity: 0.7,
                          }}
                        />

                        {/* Input field */}
                        <input
                          {...formik.getFieldProps("email")}
                          type="email"
                          placeholder="Email"
                          required
                          style={{
                            fontFamily: "Montserrat, sans-serif",
                            fontWeight: 600,
                            fontSize: "15.97px",
                            lineHeight: "100%",
                            letterSpacing: "0",
                            textAlign: "left", // aligned left now
                            paddingLeft: "44px", // space for icon + gap
                            width: "400px",
                            height: "50px",
                            borderRadius: "4px",
                            border: "1px solid #ccc",
                            backgroundColor: "#F4F8F5",
                            color: "#9A9A9A",
                          }}
                        />
                      </div>
                      {formik.touched.email && formik.errors.email ? (
                        <div
                          style={{
                            color: "red",
                            fontSize: "13px",
                            marginTop: "5px",
                            textAlign: "center",
                          }}
                        >
                          {formik.errors.email}
                        </div>
                      ) : null}
                    </div>

                    <div className="mb-3">
                      <div
                        style={{
                          position: "relative",
                          width: "fit-content",
                          margin: "auto",
                        }}
                      >
                        {/* Lock icon */}
                        <img
                          src={lockIcon}
                          alt="lock icon"
                          style={{
                            position: "absolute",
                            left: "10px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            width: "24px",
                            height: "24px",
                            pointerEvents: "none",
                            opacity: 0.7,
                          }}
                        />

                        {/* Input field */}
                        <input
                          {...formik.getFieldProps("password")}
                          type="password"
                          placeholder="Password"
                          required
                          style={{
                            fontFamily: "Montserrat, sans-serif",
                            fontWeight: 600,
                            fontSize: "15.97px",
                            lineHeight: "100%",
                            letterSpacing: "0",
                            textAlign: "left", // aligned left now
                            paddingLeft: "44px", // space for icon + gap
                            width: "400px",
                            height: "50px",
                            borderRadius: "4px",
                            border: "1px solid #ccc",
                            color: "#9A9A9A",
                            backgroundColor: "#F4F8F5",
                          }}
                        />
                      </div>
                      {formik.touched.password && formik.errors.password ? (
                        <div
                          style={{
                            color: "red",
                            fontSize: "13px",
                            marginTop: "5px",
                            textAlign: "center",
                          }}
                        >
                          {formik.errors.password}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="mb-3 text-center mt-4">
                    <a
                      href="#"
                      // className="text-decoration-none"
                      style={{
                        fontFamily: "Montserrat, sans-serif",
                        fontWeight: 700,
                        fontSize: "21.97px",
                        lineHeight: "140%",
                        letterSpacing: "0%",
                        textAlign: "center",
                        textDecoration: "underline",
                        textDecorationStyle: "solid",
                        textDecorationOffset: "0%",
                        textDecorationThickness: "0%",
                        color: "#000", // Optional: add color if needed
                      }}
                    >
                      forgot password?
                    </a>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "40px", // space from top
                    }}
                  >
                    <button
                      type="submit"
                      className="btn"
                      style={{
                        width: "347.08px",
                        height: "85.67px",
                        borderRadius: "43.93px",
                        background: "#EDA415",
                        color: "#fff",
                        fontWeight: "600",
                        fontSize: "18px",
                        border: "none",
                      }}
                    >
                      SIGN IN
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>

          {/* Welcome Content - col-md-7 (stacked below on mobile) */}
          <div
            className="col-12 col-md-5 d-flex flex-column justify-content-center align-items-center text-white  text-center p-5"
            style={{ background: "#003F62", gap: "10px" }}
          >
            <h1
              className="display-5 "
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 700,
                fontSize: "57.12px",
                lineHeight: "100%",
                letterSpacing: "0%",
                color: "#FFFFFF",
              }}
            >
              Hello Friend!
            </h1>
            <p
              className="lead "
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 400,
                fontSize: "16.36px",
                lineHeight: "140%",
                letterSpacing: "0%",
                textAlign: "center",
                color: "#FFFFFF",
                width: "434.96px",
                height: "74px",
                // marginTop: '105.44px',
                marginLeft: "15.82px",
              }}
            >
              Enter your personal details and start your journey with us
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                // marginTop: "40px",
                cursor: "pointer",
              }}
            >
              <button
                type="button"
                className="btn"
                style={{
                  width: "347.08px",
                  height: "85.67px",
                  borderRadius: "43.93px",
                  background: "transparent",
                  color: "#FFFFFF", // white text
                  fontWeight: "600",
                  fontSize: "18px",
                  border: "2px solid #FFFFFF", // white border
                }}
                onClick={() => navigate(PATHS.REGISTER)}
              >
                SIGN UP
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
