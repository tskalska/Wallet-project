export default function progressFunc(values) {
  if (
    values.email === "" &&
    values.password === "" &&
    values.confirmPassword === ""
  ) {
    values.progress = 0;
  } else if (
    values.email !== "" &&
    values.password === "" &&
    values.confirmPassword === ""
  ) {
    values.progress = 33;
  } else if (
    values.email === "" &&
    values.password !== "" &&
    values.confirmPassword === ""
  ) {
    values.progress = 33;
  } else if (
    values.email === "" &&
    values.password === "" &&
    values.confirmPassword !== ""
  ) {
    values.progress = 33;
  } else if (
    values.email !== "" &&
    values.password !== "" &&
    values.confirmPassword === ""
  ) {
    values.progress = 66;
  } else if (
    values.email !== "" &&
    values.password === "" &&
    values.confirmPassword !== ""
  ) {
    values.progress = 66;
  } else if (
    values.email === "" &&
    values.password !== "" &&
    values.confirmPassword !== ""
  ) {
    values.progress = 66;
  } else if (
    values.email !== "" &&
    values.password !== "" &&
    values.confirmPassword !== ""
  ) {
    values.progress = 100;
  }
}
