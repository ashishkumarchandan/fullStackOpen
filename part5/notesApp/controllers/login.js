import bcrypt from "bcrypt";
import { Router } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.models.js";

const loginRouter = Router();

loginRouter.post("/", async (req, res, next) => {
  try {
    const { username, password } = req.body || {};

    if (!username || !password) {
      return res.status(400).json({
        error: "username and password are required",
      });
    }

    const user = await User.findOne({
      username,
    });

    const passwordCorrect =
      user !== null ? await bcrypt.compare(password, user.passwordHash) : false;

    if (!(user && passwordCorrect)) {
      return res.status(401).json({
        error: "invalid username or password",
      });
    }

    const userForToken = {
      username: user.username,
      id: user._id.toString(),
    };

    const token = jwt.sign(userForToken, process.env.SECRET,{
      expiresIn: "1h"
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
