const Joi = require("joi");
const config = require("./../Utils/config");

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
});

module.exports = schema;
