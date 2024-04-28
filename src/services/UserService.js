import User from "../models/database/User.js";

const createUserService = (body) => User.create(body);
const findAllService = () => User.find();
const findByIdService = (id) => User.findById(id);
const updateByIdService = (id, body) =>
  User.findByIdAndUpdate(id, { $set: body });


export {
  createUserService,
  findAllService,
  findByIdService,
  updateByIdService,
};
