import * as Yup from "yup";

const generalValidation = Yup.string()
  .matches(/^[A-Za-z0-9]+(?: [A-Za-z0-9]+)*$/, "Invalid Value")
  .min(2, "Value is too short")
  .max(300, "Value is too long");

const COMMENT_VALIDATION = Yup.string()
  .matches(/^[a-zA-Z0-9\s.,!?'"@#()&+-=]*$/, "Invalid characters detected")
  .min(2, "Comment is too short")
  .max(300, "Comment is too long")
  .required("Comment is required");

export const EDIT_COMMENT_VALIDATION_SCHEMA = Yup.object().shape({
  comment: COMMENT_VALIDATION,
});

export const UPDATE_PROFILE_VALIDATION_SCHEMA = Yup.object().shape({
  first_name: generalValidation,
  last_name: generalValidation,
  email: generalValidation,
  postalcode: generalValidation,
  address: generalValidation,
  bio: generalValidation,
  city: generalValidation,
  country: generalValidation,
  type: generalValidation,
  state: generalValidation,
  username: generalValidation,
  phone: generalValidation,
  status: generalValidation,
  // hobbies: generalValidation,
  gender: generalValidation,
});
