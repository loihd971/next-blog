import stream from "stream";
import { promisify } from "util";
import fetch from "node-fetch";
import { NextApiRequest, NextApiResponse } from "next";

const pipeline = promisify(stream.pipeline);
const url =
  "https://nextauth.s3.us-west-1.amazonaws.com/Loi-Ha-TopCV.vn-061122.22155.pdf";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const response: any = await fetch(url);
  if (!response.ok)
    throw new Error(`unexpected response ${response.statusText}`);

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "attachment; filename=mycv.pdf");
  await pipeline(response.body, res);
};

export default handler;
