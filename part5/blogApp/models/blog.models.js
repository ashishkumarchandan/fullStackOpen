import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: String,
    url: { type: String, required: true },
    likes: { type: Number, default: 0 },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

blogSchema.set("toJSON", {
  transform: (document, returedObject) => {
    returedObject.id = returedObject._id.toString();
    delete returedObject._id;
    delete returedObject.__v;
  },
});

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
