import * as yup from "yup";

export const noteValidationSchema = yup.object().shape({
  note: yup
    .string()
    .required("Note is required")
    .max(500, "Note cannot exceed 500 characters")
});