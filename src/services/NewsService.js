import News from '../models/database/News.js';

export const createNewsService = (body) => News.create(body);

export const findAllService = (limit, offset) =>
  News.find().sort({ _id: -1 }).skip(offset).limit(limit).populate('user');

export const countNews = () => News.countDocuments();

export const topNewsService = () =>
  News.findOne().sort({ _id: -1 }).populate('user');

export const findByIdService = (id) => News.findById(id).populate('user');

export const findByParams = (title) =>
  News.find({
    title: {
      $regex: `${title || ''}`,
      $options: 'i',
    },
  })
    .sort({ _id: -1 })
    .populate('user');

export const byUserService = (id) =>
  News.find({ user: id }).sort({ _id: -1 }).populate('user');

export const updateService = (id, body) =>
  News.findByIdAndUpdate(id, { $set: body }, { new: true }).populate('user');

export const deleteNewsService = (id) => News.findOneAndDelete({ _id: id });

export const likeNewsService = (idNews, userId) =>
  News.findOneAndUpdate(
    { _id: idNews, 'likes.userId': { $nin: [userId] } },
    { $push: { likes: { userId, created: new Date() } } }
  );

export const deleteLikeNewsService = (idNews, userId) =>
  News.findOneAndUpdate({ _id: idNews }, { $pull: { likes: { userId } } });

export const addCommentsService = (idNews, comment, idUser) => {
  const idComment = Math.floor(Date.now() * Math.random()).toString(36);
  return News.findOneAndUpdate(
    { _id: idNews },
    {
      $push: {
        comments: {
          idComment,
          idUser,
          comment,
          createdAt: new Date(),
        },
      },
    }
  );
};

export const deleteCommentService = (idNews, idComment, idUser) =>
  News.findOneAndUpdate(
    { _id: idNews },
    { $pull: { comments: { idComment, idUser } } }
  );
