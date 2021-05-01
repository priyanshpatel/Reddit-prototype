const Joi = require("joi");

// Construct schema
const schema = Joi.object({
  // 1 -> DESC, 2 -> ASC
  orderByDate: Joi.number().integer().min(1).max(2).messages({
    "number.integer": "Select a valid sorting category",
    "number.min": "Select a valid sorting category",
    "number.max": "Select a valid sorting category",
    "number.base": "Select a valid sorting category",
  }),
  // 0 -> Nothing, 1 -> By most popular, 2-> By least popular
  orderByPopularity: Joi.number().integer().min(0).max(2).messages({
    "number.integer": "Select a valid sorting category",
    "number.min": "Select a valid sorting category",
    "number.max": "Select a valid sorting category",
    "number.base": "Select a valid sorting category",
  }),
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
  // 0 groupId means across all groups
  community_id: Joi.string().required().messages({
    "string.base": "Select a valid Community",
    "any.required": "Select a valid Community",
  }),
});

module.exports = schema;

// // Validating schema for the input fields
// const result = await schema.validate(req.query);
// if (result.error) {
//   res.status(400).send({ errorMessage: result.error.details[0].message });
//   return;
// }
