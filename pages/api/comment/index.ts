import Comment from "@/models/Comment";
import dbConnect from "@/libs/mongo";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body, query } = req;

  await dbConnect();
  res.setHeader("Allow", ["GET", "PUT", "POST", "DELETE"]);
  if (method === "POST") {
    try {
      const newPost = await Comment.create(body);
      res.status(200).json(newPost);
    } catch (error) {
      res.status(500).json({ error: true, message: error });
    }
  }

};

export default handler;
