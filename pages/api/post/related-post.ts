import dbConnect from "@/libs/mongo";
import { NextApiRequest, NextApiResponse } from "next";
import Post from "@/models/Post";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body, query } = req;

  await dbConnect();
  res.setHeader("Allow", ["GET", "PUT", "POST", "DELETE"]);

  if (method === "GET") {
    try {
      const post = await Post.findById(query.postId);
      const postTags = post.tags;

      const postByTags = await Post.find({ tags: { $in: postTags } }).limit(50);
      res.status(200).json(postByTags);
    } catch (err) {
      res.status(500).json({ error: true, message: err });
    }
  }
};

export default handler;
