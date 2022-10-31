import dbConnect from "@/services/mongo";
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
  if (method === "POST") {
    try {
      const newPost = await Post.create(req.body);
      res.status(200).json(newPost);
    } catch (error) {
      res.status(500).json({error: true, message: error});
    }
  }
  if (method === "GET") {
    try {
      const postList = await Post.find()
        .limit(Number(limit) * 1)
        .skip((Number(page) - 1) * Number(limit))
        .exec();
      const total = await Post.count();
      res.status(200).json({ postList, total });
    } catch (error) {
      res.status(500).json({error: true, message: error});
    }
  }

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
      res.status(500).json({error: true, message: error});
    }
  }
  if (method === "DELETE") {
    const post = await Post.findById(id);

    if (!post) {
      res.status(400).json("Post not found!");
    }
    const deletePost = await Post.findByIdAndDelete(id);
    res.status(200).json(deletePost);
    try {
    } catch (error) {
      res.status(500).json({error: true, message: error});
    }
  }
};

export default handler;
