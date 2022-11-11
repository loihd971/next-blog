import Comment from "@/models/Comment";
import dbConnect from "@/services/mongo";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    method,
    body,
    query: { id },
  } = req;

  await dbConnect();
  res.setHeader("Allow", ["GET", "PUT", "POST", "DELETE"]);
  //   get commit list by post
  if (method === "GET") {
    try {
      const comments = await Comment.find({ postId: id as any });

      res.status(200).json(comments);
    } catch (error) {
      res.status(500).json({ error: true, message: error });
    }
  }
  //   like/dislikes comment
  if (method === "POST") {
    try {
      const query =
        body.type === "like"
          ? {
              $addToSet: {
                likes: body.userId,
              },
              $pull: { dislikes: body.userId },
            }
          : {
              $addToSet: {
                dislikes: body.userId,
              },
              $pull: { likes: body.userId },
            };
      await Comment.findByIdAndUpdate(id, query);
      res.status(200).json("Like comment successfully!");
    } catch (error) {
      res.status(500).json({ error: true, message: error });
    }
  }
  // edit comment
  if (method === "PUT") {
    try {
      const comment = await Comment.findById(id);

      if (!comment) {
        res.status(400).json("Post not found!");
      }

      const updatedComment = await Comment.findByIdAndUpdate(
        id,
        {
          $set: body,
        },
        { new: true }
      );

      res.status(200).json(updatedComment);
    } catch (error) {
      res.status(500).json({ error: true, message: error });
    }
  }
};

export default handler;
