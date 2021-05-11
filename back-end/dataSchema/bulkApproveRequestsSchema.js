const Joi = require("joi");
const ObjectId = require("mongoose").Types.ObjectId;
const schema = Joi.object({
  community_id: Joi.string()
    .required()
    .custom((community_id, helper) => {
      if (!ObjectId.isValid(community_id)) {
        return helper.message("Select a valid community");
      } else {
        return true;
      }
    })
    .messages({
      "any.required": "Select a valid community",
    }),
  users: Joi.array()
    .min(1)
    .required()
    .items(
      Joi.string()
        .required()
        .custom((user_id, helper) => {
          if (!ObjectId.isValid(user_id)) {
            return helper.message("Select a valid user");
          } else {
            return true;
          }
        })
    )
    .messages({
      "any.required": "Select atleast 1 user",
    }),
});
module.exports = schema;
