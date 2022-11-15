import dbConnect from "@/libs/mongo";
import { NextApiRequest, NextApiResponse } from "next";
import Post from "@/models/Post";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    method,
    body,
    query: { id, page = 1, limit = 10 },
  } = req;

  await dbConnect();
  res.setHeader("Allow", ["GET", "PUT", "POST", "DELETE"]);
  // like post
  if (method === "POST") {
    try {
      const post = await Post.findByIdAndUpdate(id, {
        $addToSet: {
          likes: body.userId,
        },
      });
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({ error: true, message: error });
    }
  }

  // get detail post
  if (method === "GET") {
    try {
      const postList = await Post.findById(id);

      res.status(200).json(postList);
    } catch (error) {
      res.status(500).json({ error: true, message: error });
    }
  }
  //  update post
  if (method === "PUT") {
    try {
      const post = await Post.findById(id);

      if (!post) {
        res.status(400).json("Post not found!");
      }

      const updatedPost = await Post.findByIdAndUpdate(
        id,
        {
          $set: body,
        },
        { new: true }
      );

      res.status(200).json(updatedPost);
    } catch (error) {
      res.status(500).json({ error: true, message: error });
    }
  }
  // delete post
  if (method === "DELETE") {
    const post = await Post.findById(id);

    if (!post) {
      res.status(400).json("Post not found!");
    }
    const deletePost = await Post.findByIdAndDelete(id);
    res.status(200).json(deletePost);
    try {
    } catch (error) {
      res.status(500).json({ error: true, message: error });
    }
  }
};

export default handler;
