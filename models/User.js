import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 60,
    },
    email: {
      type: String,
      required: true,
      maxlength: 200,
    },
    avatar: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: false,
    },
    follower: {
      type: [String],
      default: [],
    },
    role: {
      // role 1: basic and 2: admin
      type: Number,
      default: 1,
    },
    fromGoogle: {
      type: Boolean,
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
