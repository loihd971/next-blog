import dbConnect from "@/services/mongo";
import { NextApiRequest, NextApiResponse } from "next";
import Post from "@/models/Post";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body, query } = req;

  await dbConnect();
  res.setHeader("Allow", ["GET", "PUT", "POST", "DELETE"]);

  if (method === "GET") {
    try {
      await Post.aggregate(
        [
          {
            $project: {
              userId: 1,
              title: 1,
              description: 1,
              content: 1,
              thumbnail: 1,
              videoUrl: 1,
              tags: 1,
              likes: 1,
              dislikes: 1,
              length: { $size: "$likes" },
            },
          },
          { $sort: { length: -1 } },
          { $limit: 5 },
        ],
        function (err, results) {
          if (results) {
            res.status(200).json(results);
          } else {
            res.status(400).json(err);
          }
        }
      );
    } catch (err) {
      res.status(500).json({ error: true, message: err });
    }
  }
};

export default handler;
