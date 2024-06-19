import { text } from 'express';
import {
  createNewsService,
  findAllService,
  countNews,
  topNewsService,
  findByIdService,
  findByParams,
  byUserService,
} from '../services/NewsService.js';

const create = async (req, res) => {
  try {
    const { title, text, banner } = req.body;

    if (!title || !text || !banner) {
      res.status(400).send({ message: 'submit all fields for registration! ' });
    }

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

const findAll = async (req, res) => {
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

const topNews = async (req, res) => {
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

const findById = async (req, res) => {
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

const searchByTitle = async (req, res) => {
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

const byUser = async (req, res) => {
    try{
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
            }))
        });
    } catch(err) {
        return res.status(500).send({ message: err.message });
    }
};

export { create, findAll, topNews, findById, searchByTitle, byUser };
