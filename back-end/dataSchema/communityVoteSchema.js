const Joi = require("joi");

const schema = Joi.object({
  communityId: Joi.string().required(),
});

module.exports = schema;