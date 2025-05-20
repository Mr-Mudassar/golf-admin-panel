export const ReturnError = (
  errors: any,
  touched: any,
  field: string
): string => {
  const error = errors[field];
  const isTouched = touched[field];
  if (error && isTouched) {
    if (typeof error === "string") return error;
    if (Array.isArray(error)) return error.join(", ");
  }
  return "";
};
