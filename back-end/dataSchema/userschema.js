var Joi = require('joi');
const passwordComplexity = require("joi-password-complexity");

const complexityOptions = {
  min: 8,
  max: 100,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  symbol: 1,
  requirementCount: 2,
};

export const SignupStatus = Object.freeze({
  INVITED: "INVITED",
  JOINED: "JOINED",
});

export const CommunityJoinStatus = Object.freeze({
  INVITED: "INVITED",
  JOINED: "JOINED",
});

const userfields = {
  name: Joi.string().min(3).max(50).required().label('Name'),
  avatar: Joi.string().uri().optional(),
  email: Joi.string().email().required().label('Email'),
  handle: Joi.string().optional(),
  gender: Joi.string().optional(),
  location: Joi.string().optional(),
  description: Joi.string().optional(),
  topics: Joi.array().optional(),
  password: passwordComplexity(complexityOptions, "password").required().label('password2'),
};

export const userschema = Joi.object().keys({
  ...userfields,
});


export const invitedUserSchema = Joi.object().keys(
  {
    _id: Joi.string().required(),
    communityJoinStatus: Joi.string().default(CommunityJoinStatus.INVITED),
  }
);