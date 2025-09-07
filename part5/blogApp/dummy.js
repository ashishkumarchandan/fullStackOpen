import express from "express";
import Blog from "../models/blog.model.js";
import { userExtractor } from "../utils/middleware.js";

const blogsRouter = express.Router();

blogsRouter.post("/", userExtractor, async (req, res, next) => {
  try {
    const user = req.user;

    const blog = new Blog({
      title: req.body.title,
      author: req.body.author,
      url: req.body.url,
      likes: req.body.likes || 0,
      user: user._id,
    });

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    res.status(201).json(savedBlog);
  } catch (error) {
    next(error);
  }
});

blogsRouter.delete("/:id", userExtractor, async (req, res, next) => {
  try {
    const user = req.user;
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ error: "blog not found" });
    }

    if (blog.user.toString() !== user._id.toString()) {
      return res.status(401).json({ error: "only the creator can delete this blog" });
    }

    await Blog.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

export default blogsRouter;
