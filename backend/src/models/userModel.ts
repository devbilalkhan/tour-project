import { Schema, Model } from "mongoose";
import { IUser } from "../types/types";
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, "A user must have name"],
  },
  email: {
    type: String,
    required: [true, "A user must have an email."],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "A user must have password."],
    unique: true,
    select: false, // do not show password when sending request to the client
  },
  passwordConfirmation: {
    type: String,
    // required: [true, "A user must confirm password"],
  },
  passwordChangedAt: Date,
  photo: String,
});

// password hash mongoose middleware
userSchema.pre("save", async function (this: IUser, next) {
  //only run this func if the password was modified
  if (!this.isModified("password")) return next();

  //hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  //delete password confirmation because we dont want to persist this in db
  this.passwordConfirmation = undefined;
  next();
});

//instance method  will available on all documents of a certain collection
//candidatePassword is the original password whereas userPassword is hashed
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  //this function returns a boolean
  return await bcrypt.compare(candidatePassword, userPassword);
};

// check if the password was changed after the token was issued to the user
userSchema.methods.changedPasswordAfter = function (
  this: any,
  JWTTimestamp: any
) {
  if (this.passwordChangedAt) {
    const changedTimestamp = this.passwordChangedAt.getTime() / 1000;
    //if the day or time when the token was issued is less than the changed timestamp then return true
    // this means the password was changed after the token was issued.
    return JWTTimestamp < changedTimestamp;
  }
};

const User: Model<IUser> = mongoose.model("User", userSchema);
module.exports = User;
