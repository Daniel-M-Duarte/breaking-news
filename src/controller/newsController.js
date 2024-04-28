import { createNewsService, findAllService } from "../services/NewsService.js";

const create = async (req, res) => {
  try {
    const { title, text, banner } = req.body;

    if (!title || !text || !banner) {
      res.status(400).send({ message: "submit all fields for registration! " });
    }

    await createNewsService({
      title,
      text,
      banner,
      user: { _id: "662c5889db1e1717ea1c0e39" },
    });
    res.status(201).send("created");
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const findAll = async (_req, res) => {
  try {
    const news = await findAllService();

    if (news.length === 0) {
      return res.status(400).send({ message: "There are not registered news" });
    }

    res.status(200).send(news);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export { create, findAll };
