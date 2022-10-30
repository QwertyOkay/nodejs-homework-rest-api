const Joi = require("joi");
const { Schema, model } = require("mongoose");
const handleSaveErrors = require("../helpers/handelSaveErrors");

const emailReg = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      match: emailReg,
      unique: true,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      required: true,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleSaveErrors);

const registSchemaJoi = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailReg).required(),
  password: Joi.string().min(6).required(),
});

const loginSchemaJoi = Joi.object({
  email: Joi.string().pattern(emailReg).required(),
  password: Joi.string().min(6).required(),
});

const updateSubJoi = Joi.object({
  subscription: Joi.string().required(),
});

const verifyEmailSchemaJoi = Joi.object({
  email: Joi.string().pattern(emailReg).required(),
});

const User = new model("user", userSchema);

module.exports = {
  User,
  registSchemaJoi,
  loginSchemaJoi,
  updateSubJoi,
  verifyEmailSchemaJoi,
};
