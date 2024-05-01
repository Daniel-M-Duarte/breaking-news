import { findUser } from "../services/AuthService.js";
import { generateToken } from "../services/AuthService.js";
import bcryptjs from "bcryptjs";

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await findUser(email);
    
    if (!user) {
      return res.status(400).send({ message: "Password or email invalid!" });
    }

    const matchPassword = await bcryptjs.compare(password, user.password);
    if (!matchPassword) {
      return res.status(400).send({ message: "Password or email invalid!" });
    }

    const token = generateToken(user._id);
    res.status(200).send({ token });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

export default login;
