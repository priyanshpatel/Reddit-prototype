import { invitedUserSchema } from './userschema';

var Joi = require('joi');

const communityfields = {
  communityName: Joi.string().min(3).max(50).required().label('Community name'),
  //communityAvatar: Joi.string().uri().required(),
  //cover: Joi.string().uri().optional(),
  description: Joi.string().required().label('Description'),
  creator: Joi.string().required(),
  //topics: Joi.array().optional(),
  //primary_topic: Joi.string().required().label('Primary topic'),
  members: Joi.array().items(invitedUserSchema).min(1).label('members'),
  rules: Joi.array()
    .items(
      Joi.object().keys({
        title: Joi.string().required().label('Rule title'),
        description: Joi.string().optional().label('Rule description'),
      })
    )
    .optional(),
};

export const communitySchema = Joi.object().keys({
  ...communityfields,
});

export const updateCommunitySchema = Joi.object().keys({
  ...communityfields,
  _id: Joi.string().required(),
});
