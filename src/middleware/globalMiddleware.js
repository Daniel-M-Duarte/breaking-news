import mongoose from 'mongoose';
import { findByIdService } from '../services/UserService.js';

const validId = (req, res, next) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ message: 'Invalid ID' });
  }

  next();
};

const validUser = async (req, res, next) => {
  const id = req.params.id;

  const user = await findByIdService(id);

  if (!user) {
    return res.status(400).send({ message: 'User not found' });
  }

  req.id = id;
  req.user = user;

  next();
};

const validCreateNews = async (req, res, next) => {
  const { title, text, banner } = req.body;

  if (!title || !text || !banner) {
    return res
      .status(400)
      .send({ message: 'submit all fields for registration! ' });
  }
  next();
};

const validUpdateNews = async (req, res, next) => {
  const { title, text, banner } = req.body;

  if (!title && !text && !banner) {
    return res
      .status(400)
      .send({ message: 'submit at least one field  for registration! ' });
  }
  next();
};

export { validId, validUser, validCreateNews, validUpdateNews };
