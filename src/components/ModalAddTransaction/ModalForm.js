import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Loader from "../Loader/Loader";
import axios from "axios";

import { addTransaction } from "../../redux/transactions/transactionsOperations";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import ModalSelect from "./ModalSelect";
import TextError from "../TextError";

function ModalForm({ closeModal }) {
  const dispatch = useDispatch();

  const [income, setIncome] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("null");
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("https://pure-atoll-67904.herokuapp.com/api/transactions/categories")
      .then((results) => setCategories(results.data))
      .catch((error) => console.log(error.message))
      .finally(() => setIsLoading(false));
  }, []);

  let today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();

  today = mm + "." + dd + "." + yyyy;

  const handleFormatting = (e) => {
    e.target.value = e.target.value
      .replace(/\B(?=(\d{2})+(?!\d))/g, ".")
      .replace(/[^0-9.]|\.(?=.*\.)/g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  const initialValues = {
    income: income,
    category: currentCategory,
    amount: "",
    date: today,
    comment: "",
  };

  const validate = Yup.object().shape({
    income: Yup.boolean(),
    category: Yup.string().required("Выберите категорию"),
    amount: Yup.string()
      .matches(
        /^[0-9][0-9]*[./,]?[0-9]{0,2}$/,
        "Введите только цифры, допускается две цифры после запятой"
      )
      .required("Укажите сумму"),
    date: Yup.date().default(() => new Date()),
    comment: Yup.string().max(15, "Комментарий не должен превышать 12 знаков"),
  });

  const handleSubmit = (values, { resetForm, setSubmitting }) => {
    const { amount, date, comment } = values;
    const checkComment = (text) => {
      if (text === "") {
        return " ";
      } else {
        return text;
      }
    };

    const currentComment = checkComment(comment);
    const modifiedAmount = amount.split(",").join(".");

    const object = {
      income,
      category: currentCategory,
      amount: modifiedAmount,
      date,
      comment: currentComment,
    };
    dispatch(addTransaction(object));
    setSubmitting(false);
    closeModal();
    resetForm();
  };

  return (
    <>
      <div className="ModalForm__switcher">
        <span
          className="ModalForm__switcher-option ModalForm__switcher-income"
          style={{
            color: income ? "var(--accentGreenColor)" : "var(--grayFive)",
          }}
        >
          Доход
        </span>
        <div className="ModalForm__switcher-control">
          <input
            onClick={() => setIncome(!income)}
            className="ModalForm__switcher-toggle"
            type="checkbox"
            name="transaction-type"
            id="switcher-toggle"
            defaultChecked
            aria-label="Выбрать расход или доход"
          />
          <label
            aria-hidden="true"
            className="ModalForm__switcher-track"
            htmlFor="switcher-toggle"
          ></label>
          <div aria-hidden="true" className="ModalForm__switcher-marker"></div>
        </div>
        <span
          className="ModalForm__switcher-option .ModalForm__switcher-spending"
          style={{
            color: income ? "var(--grayFive)" : "var(--accentRoseColor)",
          }}
        >
          Расход
        </span>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validate}
        onSubmit={handleSubmit}
        validateOnBlur={true}
      >
        {(formik) => (
          <Form className="Modal__form">
            {isLoading ? (
              <Loader color="var(--black)" />
            ) : (
              <div className="Modal__select">
                <Field
                  name="category"
                  className="hidden-select"
                  value={currentCategory}
                ></Field>
                <ModalSelect
                  income={income}
                  categories={categories}
                  setCategory={setCurrentCategory}
                  currentCategory={currentCategory}
                />
                <ErrorMessage
                  component={TextError}
                  name="category"
                  className="formikError"
                />
              </div>
            )}

            <div className="Modal__container">
              <span>
                <Field
                  type="text"
                  name="amount"
                  placeholder="0.00"
                  className="Modal__input Modal__amount"
                />
              </span>

              <span className="Modal__date">{today}</span>
            </div>
            <ErrorMessage name="amount" component={TextError} />

            <Field
              as="textarea"
              type="text"
              placeholder="Комментарий"
              className="Modal__input Modal__comment"
              name="comment"
            />
            <ErrorMessage
              component={TextError}
              name="comment"
              className="formikError"
            />

            <div className="Modal__controllers">
              <button
                type="submit"
                className="Modal__add"
                disabled={!formik.isValid}
              >
                Добавить
              </button>
              <button
                onClick={() => closeModal()}
                className="Modal__cancel"
                type="button"
              >
                Отмена
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default ModalForm;
