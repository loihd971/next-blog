import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      require: true,
    },
    title: {
      type: String,
      required: true,
      maxlength: 60,
    },
    description: {
      type: String,
      required: true,
      maxlength: 200,
    },
    content: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: false,
    },
    videoUrl: {
      type: String,
      required: false,
    },
    tags: {
      type: [String],
      default: [],
    },
    likes: {
      type: [String],
      default: [],
    },
    dislikes: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.models.Post || mongoose.model("Post", PostSchema);
