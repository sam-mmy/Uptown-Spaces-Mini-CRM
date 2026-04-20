const Joi = require("joi");

exports.createLeadSchema = Joi.object({

  name: Joi.string()
    .min(2)
    .max(100)
    .required()
    .messages({
      "string.empty": "Name is required"
    }),

  phone: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
      "string.pattern.base": "Phone must be 10 digits"
    }),

  email: Joi.string()
    .email()
    .allow("", null),

  budget: Joi.number()
    .positive()
    .required()
    .messages({
      "number.base": "Budget must be numeric"
    }),

  location: Joi.string()
    .required()
    .messages({
      "string.empty": "Location required"
    }),

  property_type: Joi.string()
    .required(),

  source: Joi.string()
    .required()

});


status: Joi.string()
  .valid("New", "Contacted", "Site Visit", "Closed")
  .required()