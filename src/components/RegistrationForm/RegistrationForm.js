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
      .email("Введите Ваш email корректно.")
      .required("Обязательное поле. Введите Ваш email."),
    password: yup
      .string()
      .min(6, "Введите минимум 6 символов.")
      .max(12, "Введите максимум 12 символов.")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,}/,
        "Пароль не соответсвует требованям безопасности."
      )
      .required("Обязательное поле. Введите Ваш пароль."),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Пароли не совпадают.")
      .required("Обязательное поле. Повторите пароль."),
    name: yup
      .string()
      .matches(
        /^[a-zA-Zа-яА-Я-А-Яа-яёЁЇїІіЄєҐґ]+(([' -][a-zA-Zа-яА-Я-А-Яа-яёЁЇїІіЄєҐґ ])?[a-zA-Zа-яА-Я-А-Яа-яёЁЇїІіЄєҐґ]*)*$/,
        "Введите только буквы."
      )
      .min(1, "Обязательное поле. Введите Ваше имя.")
      .max(12, "Введите максимум 12 символов.")
      .required("Обязательное поле. Введите Ваше имя."),
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
                      placeholder="Пароль"
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
                      placeholder="Подтвердите пароль"
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
                      placeholder="Ваше имя"
                      className="formField"
                      onBlur={(e) => {
                        progressFunc(values);
                        handleBlur(e);
                      }}
                    />
                  </div>
                  <ErrorMessage name="name" component={TextError} />
                </div>
                <Button bottomTitle={"регистрация"} disabled={!isValid} />
                <ButtonLink bottomTitle={"вход"} link={"/login"} />
              </Form>
            </div>
          );
        }}
      </Formik>
    </div>
  );
}
