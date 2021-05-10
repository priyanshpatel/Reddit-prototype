const Joi = require("joi");
const ObjectId = require("mongoose").Types.ObjectId;
const config = require("../utils/config");
const schema = Joi.object({
  invitation_id: Joi.string()
    .required()
    .custom((id, helper) => {
      if (!ObjectId.isValid(id)) {
        return helper.message("Select a valid invitation");
      } else {
        return true;
      }
    })
    .messages({
      "any.required": "Select a valid invitation",
    }),
  status: Joi.string()
    .valid(config.USER_ACCEPTED_INVITE, config.USER_REJECTED_INVITE)
    .label("status")
    .required()
    .messages({
      "any.required": "Either accept or reject the invite",
    }),
});
module.exports = schema;
