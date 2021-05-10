const Joi = require("joi");
const config = require("./../utils/config");

// Construct schema
const schema = Joi.object({
  pageNumber: Joi.number().integer().min(1).required().messages({
    "number.integer": "Select a valid page number",
    "number.min": "Select a valid page number",
    "number.base": "Select a valid page number",
    "any.required": "Select a valid page number",
  }),
  pageSize: Joi.number().integer().min(1).messages({
    "number.integer": "Select a valid page size",
    "number.min": "Select a valid page size",
    "number.base": "Select a valid page size",
  }),
  searchKeyword: Joi.string(),
  userType: Joi.string()
    .valid(
      config.REQUESTED_TO_JOIN_COMMUNITY,
      config.ACCEPTED_REQUEST_TO_JOIN_COMMUNITY
    )
    .required()
    .messages({
      "any.required": "Enter a valid userType.",
      "string.valid": "Enter a valid userType.",
    }),
});

module.exports = schema;
