// models/note.js
import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    minlength: 5,
  },
  important: {
    type: Boolean,
    default: false,
  },
  date: { type: Date, default: Date.now },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

// transform _id to id and remove __v
noteSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    if (returnedObject.date) {
      returnedObject.date = returnedObject.date.toISOString();
    }
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export default mongoose.model("Note", noteSchema);
