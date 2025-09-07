import express from "express";
import Blog from "../models/blog.models.js";
import middleware from "../utils/middleware.js";
const blogRouter = express.Router();

blogRouter.get("/", async (req, res, next) => {
  try {
    const blogs = await Blog.find({}).populate("user", {
      username: 1,
      name: 1,
    });
    res.json(blogs);
  } catch (error) {
    next(error);
  }
});

blogRouter.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        error: "malformatted id",
      });
    }

    const blog = await Blog.findById(req.params.id);

    if (blog) {
      res.json(blog);
    } else {
      res.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});

blogRouter.post("/", middleware.userExtractor, async (req, res, next) => {
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

blogRouter.delete("/:id", middleware.userExtractor, async (req, res, next) => {
  try {
    const user = req.user;
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ error: "blog not found" });
    }

    if (blog.user.toString() !== user._id.toString()) {
      return res
        .status(401)
        .json({ error: "only the creator can delete this blog" });
    }

    await Blog.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

blogRouter.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ error: "malformatted id" });
    }

    const { title, author, url, likes } = req.body;

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      {
        title,
        author,
        url,
        likes,
      },
      { new: true, runValidators: true, context: "query" }
    );

    if (!updatedBlog) {
      return res.status(404).json({
        error: "Blog not  found",
      });
    }

    res.json(updatedBlog);
  } catch (error) {
    next(error);
  }
});

export default blogRouter;
