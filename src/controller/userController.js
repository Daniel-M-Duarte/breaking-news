import {
  createUserService,
  findAllService,
  updateByIdService,
} from "../services/UserService.js";

const create = async (req, res) => {
  try {
    const { name, username, email, password, avatar, background } = req.body;

    if (!name || !username || !email || !password || !avatar || !background) {
      return res.status(400).send({ message: "Submit all field for registration" });
    }

    const user = await createUserService(req.body);

    if (!user) {
      return res.status(400).send({ message: "bad request" });
    }

    res.status(201).json({
      message: "User created successfully!!",
      user: {
        id: user._id,
        name,
        username,
        email,
        avatar,
        background,
      },
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const findAll = async (_req, res) => {
  try {
    const users = await findAllService();

    if (users.length === 0) {
      return res.status(400).send({ message: "There are not registered user" });
    }

    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const findById = async (req, res) => {
  try {
    const user = req.user;

    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { name, username, email, password, avatar, background } = req.body;

    if (!name && !username && !email && !password && !avatar && !background) {
      res
        .status(400)
        .send({ message: "Submit at least one field for registration" });
    }

    const id = req.id;

    const { body } = req;

    await updateByIdService(id, body);

    res.status(200).send({ message: "User update successfully" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export { create, findAll, findById, updateUser };
