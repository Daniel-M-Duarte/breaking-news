import {
  createNewsService,
  findAllService,
  countNews,
  topNewsService,
  findByIdService,
  findByParams,
  byUserService,
  updateService,
  deleteNewsService,
  likeNewsService,
  deleteLikeNewsService,
  addCommentsService,
  deleteCommentService,
} from '../services/NewsService.js';

export const create = async (req, res) => {
  const { title, text, banner } = req.body;

  try {
    await createNewsService({
      title,
      text,
      banner,
      user: req.userId,
    });
    return res.status(201).send('created');
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

export const findAll = async (req, res) => {
  let { limit, offset } = req.query;

  limit = Number(limit);
  offset = Number(offset);

  if (!limit) limit = 5;
  if (!offset) offset = 0;

  try {
    const news = await findAllService(limit, offset);

    const total = await countNews();
    const currentUrl = req.baseUrl;
    const next = limit + offset;

    const nextUrl =
      next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null;
    const previous = offset - limit < 0 ? null : offset - limit;

    const previousUrl =
      previous !== null
        ? `${currentUrl}?limit=${limit}&offset=${previous}`
        : null;

    if (news.length === 0) {
      return res.status(400).send({ message: 'There are not registered news' });
    }

    res.status(200).send({
      nextUrl,
      previousUrl,
      limit,
      offset,
      total,

      results: news.map((item) => ({
        id: item._id,
        title: item.title,
        text: item.text,
        banner: item.banner,
        likes: item.likes,
        comments: item.comments,
        name: item.user.name,
        username: item.user.username,
        avatar: item.user.avatar,
      })),
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

export const topNews = async (req, res) => {
  try {
    const topNews = await topNewsService();

    if (!topNews) {
      return res.status(400).send({ message: 'There are not registered news' });
    }

    return res.status(200).send({
      news: {
        id: topNews._id,
        title: topNews.title,
        text: topNews.text,
        banner: topNews.banner,
        likes: topNews.likes,
        comments: topNews.comments,
        name: topNews.user.name,
        username: topNews.user.username,
        avatar: topNews.user.avatar,
      },
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

export const findById = async (req, res) => {
  const { id } = req.params;
  try {
    const news = await findByIdService(id);

    if (!news) return res.status(400).send({ message: 'No news were found ' });

    return res.status(200).send({
      id: news._id,
      title: news.title,
      text: news.text,
      banner: news.banner,
      likes: news.likes,
      comments: news.comments,
      name: news.user.name,
      username: news.user.username,
      avatar: news.user.avatar,
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

export const searchByTitle = async (req, res) => {
  const { title } = req.query;
  try {
    const news = await findByParams(title);

    if (news.length < 1)
      return res.status(400).send({ message: 'No news was found!' });

    return res.status(200).send({
      results: news.map((item) => ({
        id: item._id,
        title: item.title,
        text: item.text,
        banner: item.banner,
        likes: item.likes,
        comments: item.comments,
        name: item.user.name,
        username: item.user.username,
        userAvatar: item.user.avatar,
      })),
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

export const byUser = async (req, res) => {
  try {
    const id = req.userId;
    const news = await byUserService(id);
    return res.status(200).send({
      results: news.map((item) => ({
        id: item._id,
        title: item.title,
        text: item.text,
        banner: item.banner,
        likes: item.likes,
        comments: item.comments,
        name: item.user.name,
        username: item.user.username,
        userAvatar: item.user.avatar,
      })),
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

export const update = async (req, res) => {
  try {
    const { title, text, banner } = req.body;
    const { id } = req.params;

    if (!title && !text && !banner) {
      return res.send(400).send({
        message: 'Submit at least one field to update the post',
      });
    }
    const checkNews = await findByIdService(id);

    if (!checkNews) {
      return res.status(404).send({ message: 'Not found' });
    }

    if (String(checkNews.user._id) !== String(req.userId)) {
      return res
        .status(401)
        .send({ message: "You don't have permission to update it" });
    }

    const news = await updateService(id, req.body);

    return res.status(200).send({
      id: news._id,
      title: news.title,
      text: news.text,
      banner: news.banner,
      likes: news.likes,
      comments: news.comments,
      name: news.user.name,
      username: news.user.username,
      avatar: news.user.avatar,
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

export const erase = async (req, res) => {
  try {
    const { id } = req.params;

    const checkNews = await findByIdService(id);

    if (!checkNews) {
      return res.status(404).send({ message: 'Not found' });
    }

    if (String(checkNews.user._id) !== String(req.userId)) {
      return res
        .status(401)
        .send({ message: "You don't have permission to update it" });
    }

    await deleteNewsService(id);

    return res.status(200).send({ message: 'News deleted successfully' });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

export const likeNews = async (req, res) => {
  try {
    const { id } = req.params;

    const userId = req.userId;

    const newsLiked = await likeNewsService(id, userId);

    if (!newsLiked) {
      await deleteLikeNewsService(id, userId);
      return res.status(200).send({ message: 'Like removed successfully' });
    }

    return res.send({ message: 'liked' });
  } catch (err) {
    return res.status(500).send({ erro: err.message });
  }
};

export const addComments = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    const { comment } = req.body;

    if (!comment) {
      return res.status(400).send({ message: 'Write a message to comment' });
    }

    const news = await findByIdService(id);

    if (!news) return res.status(400).send({ message: 'No news were found ' });

    await addCommentsService(id, comment, userId);

    return res.status(200).send({ message: 'Comment added successfully' });
  } catch (err) {
    return res.status(500).send({ erro: err.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { idNews, idComment } = req.params;

    const idUser = req.userId;

    const news = await findByIdService(idNews);

    if (!news) return res.status(400).send({ message: 'No news were found ' });

    const commentDeleted = await deleteCommentService(
      idNews,
      idComment,
      idUser
    );

    const commentFinder = commentDeleted.comments.find(
      (comment) => comment.idComment === idComment
    );

    if (!commentFinder) {
        return res.status(404).send({ message: 'Comment does not exists!'})
    }

    if (!commentFinder.idUser.equals(idUser)) {
      return res.status(400).send({ message: "You can't delete this comment" });
    }

    return res.status(200).send({ message: 'Comment successfully deleted' });
  } catch (err) {
    return res.status(500).send({ erro: err.message });
  }
};
