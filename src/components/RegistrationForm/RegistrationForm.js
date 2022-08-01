import React from "react";
import { useDispatch } from "react-redux";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { Progress } from "antd";

import authOperation from "../../redux/auth/authOperation";

import LogoWallet from "../../components/LogoWallet";
import Button from "../ButtonForm";
import ButtonLink from "../ButtonLinkForm";
import TextError from "../TextError";

import emailImg from "../../img/icons/email.svg";
import passwordImg from "../../img/icons/lock.svg";
import nameImg from "../../img/icons/name.svg";
import progressFunc from "../../components/ProgressiveBar/progressFunc";

import "../../css/main.min.css";

export default function RegisterForm() {
  const dispatch = useDispatch();

  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    progress: 0,
  };

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter your email address correctly.")
      .required("Required field. Enter your email."),
    password: yup
      .string()
      .min(6, "Please enter at least 6 characters.")
      .max(12, "Enter a maximum of 12 characters.")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,}/,
        "The password does not meet security requirements."
      )
      .required("Required field. Enter your password."),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords do not match.")
      .required("Required field. Repeat password."),
    name: yup
      .string()
      .matches(
        /^[a-zA-Zа-яА-Я-А-Яа-яёЁЇїІіЄєҐґ]+(([' -][a-zA-Zа-яА-Я-А-Яа-яёЁЇїІіЄєҐґ ])?[a-zA-Zа-яА-Я-А-Яа-яёЁЇїІіЄєҐґ]*)*$/,
        "Enter only letters."
      )
      .min(1, "Required field. Enter your name.")
      .max(12, "Enter a maximum of 12 characters.")
      .required("Required field. Enter your name."),
  });

  const onSubmit = (values, { setSubmitting, resetForm }) => {
    const { email, password, name } = values;
    dispatch(authOperation.register({ name, email, password }));
    setSubmitting(false);
    resetForm();
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ values, handleBlur, isValid }) => {
          return (
            <div className="formComponentReg">
              <div className="logoForm">
                <LogoWallet />
              </div>
              <Form className="form">
                <div className="inputError">
                  <div className="input">
                    <img
                      src={emailImg}
                      alt="email"
                      height={24}
                      className="formImg"
                    />
                    <Field
                      type="text"
                      id="email"
                      name="email"
                      value={values.email}
                      placeholder="E-mail"
                      className="formField"
                      onBlur={(e) => {
                        progressFunc(values);
                        handleBlur(e);
                      }}
                    />
                  </div>
                  <ErrorMessage name="email" component={TextError} />
                </div>
                <div className="inputError">
                  <div className="input tooltip">
                    <img
                      src={passwordImg}
                      alt="password"
                      height={24}
                      className="formImg"
                    />
                    <Field
                      type="password"
                      name="password"
                      id="password"
                      value={values.password}
                      placeholder="Password"
                      className="formField"
                      onBlur={(e) => {
                        progressFunc(values);
                        handleBlur(e);
                      }}
                    />
                    <span className="tooltiptext">
                      Больше 6 и меньше 12 симвовлов. Содержать цифры, буквы
                      большие и маленькие
                    </span>
                  </div>
                  <ErrorMessage name="password" component={TextError} />
                </div>
                <div className="inputError">
                  <div className="input">
                    <img
                      src={passwordImg}
                      alt="password"
                      height={24}
                      className="formImg"
                    />
                    <Field
                      type="password"
                      name="confirmPassword"
                      id="confirmPassword"
                      value={values.confirmPassword}
                      placeholder="Confirm the password"
                      className="formField"
                      onBlur={(e) => {
                        progressFunc(values);
                        handleBlur(e);
                      }}
                    />
                  </div>
                  <ErrorMessage name="confirmPassword" component={TextError} />
                </div>
                <Progress
                  strokeColor={{ from: "#24CCA7", to: "#24CCA7" }}
                  percent={values.progress}
                  showInfo={false}
                  status="active"
                  className="progressForm"
                />
                <div className="inputError">
                  <div className="input">
                    <img
                      src={nameImg}
                      alt="password"
                      height={24}
                      className="formImg"
                    />
                    <Field
                      type="text"
                      name="name"
                      id="name"
                      value={values.name}
                      placeholder="Your Name"
                      className="formField"
                      onBlur={(e) => {
                        progressFunc(values);
                        handleBlur(e);
                      }}
                    />
                  </div>
                  <ErrorMessage name="name" component={TextError} />
                </div>
                <Button bottomTitle={"Create account"} disabled={!isValid} />
                <ButtonLink bottomTitle={"Sign in"} link={"/login"} />
              </Form>
            </div>
          );
        }}
      </Formik>
    </div>
  );
}
