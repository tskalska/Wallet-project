import React from "react";
import { useDispatch } from "react-redux";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

import LogoWallet from "../LogoWallet/LogoWallet";
import Button from "../ButtonForm";
import ButtonLink from "../ButtonLinkForm";
import TextError from "../TextError";

import authOperation from "../../redux/auth/authOperation";

import email from "../../img/icons/email.svg";
import password from "../../img/icons/lock.svg";

import "../../css/main.min.css";

export default function LoginForm() {
  const dispatch = useDispatch();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Enter your email correctly.")
      .required("Required field. Enter your email."),
    password: yup.string().required("Required field. Enter your password."),
  });

  const onSubmit = (values, { setSubmitting, resetForm }) => {
    const { email, password } = values;
    dispatch(authOperation.logIn({ email, password }));
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
        {({ values, isValid }) => {
          return (
            <div className="formComponentLog">
              <div className="logoForm">
                <LogoWallet />
              </div>
              <Form className="form">
                <div className="inputError">
                  <div className="input">
                    <img
                      src={email}
                      alt="email"
                      height={24}
                      className="formImg"
                    />
                    <Field
                      type="text"
                      id="email"
                      value={values.email}
                      name="email"
                      placeholder="E-mail"
                      className="formField"
                    />
                  </div>
                  <ErrorMessage name="email" component={TextError} />
                </div>

                <div className="inputError">
                  <div className="input">
                    <img
                      src={password}
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
                    />
                  </div>
                  <ErrorMessage name="password" component={TextError} />
                </div>
                <Button bottomTitle={"Sign in"} disabled={!isValid} />
                <ButtonLink bottomTitle={"Create account"} link={"/register"} />
              </Form>
            </div>
          );
        }}
      </Formik>
    </div>
  );
}
