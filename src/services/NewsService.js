import News from "../models/database/News.js";

const createNewsService = (body) => News.create(body);
const findAllService = () => News.find();

export { createNewsService, findAllService };