import dbConnect from "@/libs/mongo";
import { NextApiRequest, NextApiResponse } from "next";
import Post from "@/models/Post";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    method,
    body,
    query: { title },
  } = req;

  await dbConnect();
  res.setHeader("Allow", ["GET", "PUT", "POST", "DELETE"]);

  if (method === "GET") {
    try {
      const postList = await Post.find({ title: { $regex: title, $options: "i" } });
      const total = postList.length;
      res.status(200).json({ postList, total });
    } catch (error) {
      res.status(500).json({ error: true, message: error });
    }
  }
};

export default handler;
