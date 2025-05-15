import * as Yup from "yup";

const generalValidation = Yup.string()
  .matches(/^[A-Za-z0-9]+(?: [A-Za-z0-9]+)*$/, "Invalid Value")
  .min(2, "Value is too short")
  .max(300, "Value is too long");

export const EDIT_COMMENT_VALIDATION_SCHEMA = Yup.object().shape({
  comment: generalValidation,
});
