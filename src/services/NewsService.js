import News from '../models/database/News.js';

const createNewsService = (body) => News.create(body);
const findAllService = (limit, offset) =>
  News.find().sort({ _id: -1 }).skip(offset).limit(limit).populate('user');
const countNews = () => News.countDocuments();
const topNewsService = () => News.findOne().sort({ _id: -1 }).populate('user');
const findByIdService = (id) => News.findById(id).populate('user');
const findByParams = (title) =>
  News.find({
    title: {
      $regex: `${title || ''}`,
      $options: 'i',
    },
  })
    .sort({ _id: -1 })
    .populate('user');

    const byUserService = (id) => News.find({ user: id }).sort({ _id: -1 }).populate('user');

export {
  createNewsService,
  findAllService,
  countNews,
  topNewsService,
  findByIdService,
  findByParams,
  byUserService
};
