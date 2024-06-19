import User from "../models/database/User.js";
import jwt from "jsonwebtoken";

const findUser = (email) => {
  return User.findOne({ email }).select("+password");
};

const generateToken = (id) => {
  const tokenGenerated = jwt.sign({ id }, process.env.SECRET_JWT, {
    expiresIn: 86460,
  });

  return tokenGenerated;
};

export { findUser, generateToken };
