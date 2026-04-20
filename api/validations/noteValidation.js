const Joi = require("joi");

exports.createNoteSchema = Joi.object({

  lead_id: Joi.number()
    .integer()
    .required()
    .messages({
      "number.base": "Lead ID must be numeric",
      "any.required": "Lead ID is required"
    }),

  note: Joi.string()
    .max(500)
    .required()
    .messages({
      "string.empty": "Note cannot be empty",
      "string.max": "Note cannot exceed 500 characters"
    })

});