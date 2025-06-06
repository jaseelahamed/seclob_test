import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiCall } from "@/services/apiCall";
import { URLS } from "@/constants/apiUrls";
import { PATHS } from "@/constants/paths";
import emailIcon from "../../assets/img/mail.png";
import lockIcon from "../../assets/img/lock.png";
import userIcon from "../../assets/img/user.png";
import { Formik, Form } from "formik";
import { toast } from "react-hot-toast";
import { useAuth } from "../../providers/AuthProvider";
import Input from "../../componets/Input";
import { useMutation } from "@tanstack/react-query";
import { RegisterValidationSchema } from "../../utils/authValidation";
const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const registerMutation = useMutation({
    mutationFn: (values) => {
      const { confirmPassword, ...rest } = values;

      return register(rest);
    },
    onSuccess: () => {
      toast.success("Registered successfully!");
      navigate("/login");
    },
    onError: (error) => {
      toast.error(error.message || "Registration failed");
    },
  });

  const handleSubmit = (values) => {
    console.log(values,"values........................")
    registerMutation.mutate(values);
  };

  return (
    <>
      <div className="container-fluid vh-100 d-flex">
        <div className="row flex-grow-1 w-100">
          {/* Welcome Content - col-md-5 (left side) */}
          <div
            className="col-12 col-md-5 d-flex flex-column justify-content-center align-items-center text-white text-center p-5"
            style={{ background: "#003F62", gap: "10px" }}
          >
            <h1
              className="display-5"
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
              className="lead"
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
                marginLeft: "15.82px",
              }}
            >
              To keep connected with us plase login with your personal info
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <button
                type="submit"
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
              >
                SIGN IN
              </button>
            </div>
          </div>

          {/* Sign Up Form - col-md-7 (right side) */}
          <div className="col-12 col-md-7 d-flex align-items-center justify-content-center bg-white shadow">
            <Formik
              initialValues={{
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
              }}
              validationSchema={RegisterValidationSchema}
              onSubmit={handleSubmit}
            >
              {(formik) => (
                <Form className="w-75 my-5">
                  <div className="d-flex justify-content-center align-items-center">
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
                      Create Your Account
                    </h2>
                  </div>

                  <div className="d-flex flex-column justify-content-center align-items-center">
                    <style>
                      {`
              /* Placeholder color */
              ::placeholder {
                color: #9A9A9A;
                opacity: 1; /* for Firefox */
              }
            `}
                    </style>

                    {/* Name Field */}
                    <div className="mb-3">
                      <div
                        style={{
                          position: "relative",
                          width: "fit-content",
                          margin: "auto",
                        }}
                      >
                        {/* User icon (optional), or use same email icon for demo */}
                        <img
                          src={userIcon} // You need to provide a user icon here or remove this img if you don't have one
                          alt="user icon"
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
                        <input
                        {...formik.getFieldProps("name")}
                          type="text"
                          placeholder="Name"
                          required
                          style={{
                            fontFamily: "Montserrat, sans-serif",
                            fontWeight: 600,
                            fontSize: "15.97px",
                            lineHeight: "100%",
                            letterSpacing: "0",
                            textAlign: "left",
                            paddingLeft: "44px",
                            width: "400px",
                            height: "50px",
                            borderRadius: "4px",
                            border: "1px solid #ccc",
                            backgroundColor: "#F4F8F5",
                            color: "#9A9A9A",
                          }}
                        />
                      </div>
                      {formik.touched.name && formik.errors.name && (
                        <div
                          style={{
                            color: "red",
                            fontSize: "13px",
                            marginTop: "5px",
                            textAlign: "center",
                          }}
                        >
                          {formik.errors.name}
                        </div>
                      )}
                    </div>

                    {/* Email Field */}
                    <div className="mb-3">
                      <div
                        style={{
                          position: "relative",
                          width: "fit-content",
                          margin: "auto",
                        }}
                      >
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
                            textAlign: "left",
                            paddingLeft: "44px",
                            width: "400px",
                            height: "50px",
                            borderRadius: "4px",
                            border: "1px solid #ccc",
                            backgroundColor: "#F4F8F5",
                            color: "#9A9A9A",
                          }}
                        />
                      </div>
                      {formik.touched.email && formik.errors.email && (
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
                      )}
                    </div>

                    {/* Password Field */}
                    <div className="mb-3">
                      <div
                        style={{
                          position: "relative",
                          width: "fit-content",
                          margin: "auto",
                        }}
                      >
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
                            textAlign: "left",
                            paddingLeft: "44px",
                            width: "400px",
                            height: "50px",
                            borderRadius: "4px",
                            border: "1px solid #ccc",
                            color: "#9A9A9A",
                            backgroundColor: "#F4F8F5",
                          }}
                        />
                      </div>
                      {formik.touched.password && formik.errors.password && (
                        <div
                          style={{
                            color: "red",
                            fontSize: "13px",
                            marginTop: "5px",
                            textAlign: "center",
                          }}
                        >
                          {formik?.errors?.password}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mb-3 text-center mt-4">
                    <a
                      href="#"
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
                        color: "#000",
                      }}
                    >
                      forgot password?
                    </a>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "40px",
                      cursor:"pointer"
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
                       onClick={() => navigate(PATHS.LOGIN)}  
                    >
                      SIGN IN
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
