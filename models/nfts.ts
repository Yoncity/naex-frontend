import mongoose from "mongoose";

const nftsSchema = new mongoose.Schema(
  {
    amount: {
      type: String,
      required: true,
    },
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    tokenId: { type: Number },
    owner: { type: String },
    image: { type: String },
  },
  { timestamps: true }
);

const Nfts = mongoose.models.Nfts || mongoose.model("Nfts", nftsSchema);

export default Nfts;
