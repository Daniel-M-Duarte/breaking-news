import { Router } from "express";
import {
  create,
  findAll,
  findById,
  updateUser,
} from "../controller/userController.js";
import { validId, validUser } from "../middleware/globalMiddleware.js";

const router = Router();

router.post("/", create);
router.get("/", findAll);
router.get("/:id", validId, validUser, findById);
router.patch("/:id", validId, validUser, updateUser);

export default router;
