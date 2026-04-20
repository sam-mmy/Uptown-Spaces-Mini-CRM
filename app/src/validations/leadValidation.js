import * as yup from "yup";

export const leadValidationSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required"),

  phone: yup
    .string()
    .matches(/^[0-9]{10}$/, "Phone must be 10 digits")
    .required("Phone number is required"),

  email: yup
    .string()
    .email("Invalid email format")
    .nullable(),

  budget: yup
    .number()
    .typeError("Budget must be a number")
    .positive("Budget must be positive")
    .required("Budget is required"),

  location: yup
    .string()
    .required("Location is required"),

  property_type: yup
    .string()
    .oneOf(["1BHK", "2BHK", "3BHK", "4BHK", "Plot"])
    .required("Property type is required"),

  source: yup
    .string()
    .oneOf(["Facebook", "Google", "Referral"])
    .required("Lead source is required")
});