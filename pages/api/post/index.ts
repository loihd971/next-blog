import dbConnect from "@/services/mongo";
import { NextApiRequest, NextApiResponse } from "next";
import Post from "@/models/Post";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    method,
    body,
    query: { id, sort, search },
  } = req;

  await dbConnect();
  res.setHeader("Allow", ["GET", "PUT", "POST", "DELETE"]);
  if (method === "POST") {    
    try {
      const newPost = await Post.create(body);
      res.status(200).json(newPost);
    } catch (error) {
      res.status(500).json({ error: true, message: error });
    }
  }
  if (method === "GET") {
    try {
      const { page = 1, pageSize = 10, sort, ...rest } = req.query;
      let filter: any = {};
      Object.entries(rest).map(([key, value]) => {
        if (!!value) {
          filter[key] = { $regex: value, $options: "i" };
        }
      });

      const postList = await Post.find(filter)
        .sort({ id: -1 })
        .limit(Number(pageSize) * 1)
        .skip((Number(page) - 1) * Number(pageSize))
        .exec();

      const total =
        Object.keys(filter).length > 0 ? postList?.length : await Post.count();
      res.status(200).json({ postList, total });
    } catch (error) {
      res.status(500).json({ error: true, message: error });
    }
  }
};

export default handler;
