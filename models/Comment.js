import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      maxlength: 60,
    },
    postId: {
      type: String,
      required: true,
      maxlength: 60,
    },
    userName: {
      type: String,
      required: true,
    },
    likes: {
      type: [String],
      default: [],
    },
    dislikes: {
      type: [String],
      default: [],
    },
    userAvatar: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    parentCommentId: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Comment ||
  mongoose.model("Comment", CommentSchema);
