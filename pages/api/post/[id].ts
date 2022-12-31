import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const postId = req.query.id;

  if (req.method === "GET" && typeof postId === "string") {
    handleGET(postId, res);
  } else {
    throw Error(`${req.method}はこのルーティングでサポートされていません。`);
  }
}

async function handleGET(postId: string, res: NextApiResponse) {
  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  });
  res.json(post);
}
