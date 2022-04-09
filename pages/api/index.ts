// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/mongodb";
import Nfts from "../../models/nfts";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await dbConnect();

  if (req.method === "GET") {
    const owner = req.query.owner;
    if (owner) {
      const nft = await Nfts.find({ owner });
      const data = {
        status: 200,
        data: nft,
      };
      res.status(201).json(data);
    }
    res
      .status(400)
      .json({ message: "Bad Request, please specify address", status: 400 });
  } else if (req.method === "POST") {
    const nft = await Nfts.create(req.body);

    if (nft) {
      const data = {
        status: 201,
        message: "Successfully Minted NFT",
        tokenId: nft.tokenId,
      };
      res.status(201).json(data);
    }
  }
}
