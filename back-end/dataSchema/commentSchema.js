const Joi = require("joi");
const schema = Joi.object({
  description: Joi.string().max(180).required().messages({
    "string.max": "Description should not exceed 180 characters.",
  }),
  parent_id: Joi.string().messages({
    "any.required": "Select a valid parent comment.",
  }),
  post_id: Joi.string().required().messages({
    "any.required": "Select a valid post.",
  }),
  community_id: Joi.string().required().messages({
    "any.required": "Select a valid community.",
  }),
});

module.exports = schema;
