import express from "express";
import Blog from "../models/blog.models.js";
const blogRouter = express.Router();

blogRouter.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find({});
    res.json(blogs);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve blogs", error: error.message });
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

blogRouter.post("/", async (req, res) => {
  const body = req.body;

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  });
  try {
    const savedBlog = await blog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

blogRouter.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ error: "malformatted id" });
    }

    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      return res.status(404).json({
        error: "Blog not found",
      });
    } else {
      res.status(204).end();
    }
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
