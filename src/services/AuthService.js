import User from "../models/database/User.js";
import jwt from "jsonwebtoken";

const findUser = (email) => {
  const response = User.findOne({ email }).select("+password");
  return response;
};

const generateToken = (id) => {
  const tokenGenerated = jwt.sign({ id }, process.env.SECRET_JWT, {
    expiresIn: 86460,
  });

  return tokenGenerated;
};

export { findUser, generateToken };
