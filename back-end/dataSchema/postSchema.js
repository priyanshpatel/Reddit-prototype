const Joi = require("joi");

const schema = Joi.object({
  type: Joi.string().valid("text", "image", "link").required().messages({
    "any.message": "Select a valid post category.",
    "any.required": "Select a valid post category",
  }),
  title: Joi.string().max(100).required().messages({
    "string.max": "Title should not exceed 100 characters.",
    "any.required": "Enter a valid title.",
    "string.empty": "Enter a valid title.",
  }),
  description: Joi.string().max(180).messages({
    "string.max": "Description should not exceed 180 characters.",
  }),
  link: Joi.string().uri().messages({
    "string.uri": "Enter a valid link.",
  }),
  community_id: Joi.string().required().messages({
    "any.required": "Select a valid community",
  }),
});

module.exports = schema;
