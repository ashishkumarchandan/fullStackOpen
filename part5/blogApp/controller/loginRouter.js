import jwt from "jsonwebtoken";
import express from "express";
import bcrypt from "bcrypt";
import User from "../models/user.model.js";

const loginRouter = express.Router();

loginRouter.post("/", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({
      username,
    });

    const passwordCorrect =
      user == null ? false : await bcrypt.compare(password, user.passwordHash);

    if (!(user && passwordCorrect)) {
      return res.status(401).json({
        error: "invalid username or password",
      });
    }

    const userForToken = {
      username: user.username,
      id: user._id,
    };

    const token = jwt.sign(userForToken, process.env.SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      token,
      username: user.username,
      name: user.name,
    });
  } catch (error) {
    next(error);
  }
});

export default loginRouter;
