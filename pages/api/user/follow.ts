import dbConnect from "@/services/mongo";
import { NextApiRequest, NextApiResponse } from "next";
import User from "@/models/User";
import Post from "@/models/Post";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    method,
    body,
    query: { id },
  } = req;

  await dbConnect();
  res.setHeader("Allow", ["GET", "PUT", "POST", "DELETE"]);

  if (method === "POST") {
    try {
      const author = await User.findByIdAndUpdate(body.authorId, {
        $addToSet: {
          follower: body.followerId,
        },
      });
      res.status(200).json(author);
    } catch (error: any) {
      res.status(500).json({ error: true, message: error.message });
    }
  }
};

export default handler;
