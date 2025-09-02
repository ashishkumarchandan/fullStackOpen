import mongoose from "mongoose";

// mongoose.set("strictQuery", false);

const noteSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, "Content is required"],
      minLength: 3,
    },
    important: Boolean,
  },
  {
    timestamps: true,
  }
);

noteSchema.set("toJSON", {
  transform: (_doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});
const Note = mongoose.model("Note", noteSchema);

export default Note;
