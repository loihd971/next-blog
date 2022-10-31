import dbConnect from "@/services/mongo";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    await dbConnect()
};

export default handler;
