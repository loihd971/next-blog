import dbConnect from "@/libs/mongo";
import { NextApiRequest, NextApiResponse } from "next";
import User from "@/models/User";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    method,
    body,
    query: { id },
  } = req;

  await dbConnect();
  res.setHeader("Allow", ["GET", "PUT", "POST", "DELETE"]);

  if (method === "GET") {
    try {
      const user = await User.find();
      res.status(200).json(user);
    } catch (error: any) {
      res.status(500).json({ error: true, message: error.message });
    }
  }
};

export default handler;
