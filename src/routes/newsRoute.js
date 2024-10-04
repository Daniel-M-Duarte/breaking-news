import { Router } from 'express';
import {
  create,
  findAll,
  topNews,
  findById,
  searchByTitle,
  byUser,
  update,
  erase,
  likeNews,
  addComments,
  deleteComment,
} from '../controller/newsController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import {
  validId,
  validCreateNews,
  validUpdateNews,
} from '../middleware/globalMiddleware.js';

const newsRouter = Router();

newsRouter.post('/', authMiddleware, validCreateNews, create);
newsRouter.get('/', findAll);
newsRouter.get('/top', topNews);
newsRouter.get('/search', searchByTitle);
newsRouter.get('/byUser', authMiddleware, byUser);
newsRouter.get('/:id', authMiddleware, validId, findById);
newsRouter.patch('/:id', authMiddleware, validUpdateNews, update);
newsRouter.delete('/:id', authMiddleware, erase);
newsRouter.patch('/like/:id', authMiddleware, likeNews);
newsRouter.patch('/comment/:id', authMiddleware, addComments);
newsRouter.patch('/comment/:idNews/:idComment/', authMiddleware, deleteComment);

export default newsRouter;
