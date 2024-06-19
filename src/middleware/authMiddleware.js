import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { findByIdService } from "../services/UserService.js";

dotenv.config();

export const authMiddleware = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).send({ message: "Not authorize" });
    }

    const parts = authorization.split(" ");

    if (parts.length !== 2) {
      return res.status(400).send({ message: "Error token" });
    }

    const [schema, token] = parts;

    if (schema !== "Bearer") {
      return res.status(400).send({ message: "Error token" });
    }

    jwt.verify(token, process.env.SECRET_JWT, async (error, decoded) => {
      if (error) {
        return res.status(401).send({ message: "Token Invalid" });
      }
      const user = await findByIdService(decoded.id);

      if (!user || !user._id) {
        return res.status(404).send({ message: 'user not found'})
      }
      req.userId = user._id;
      next();
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};
