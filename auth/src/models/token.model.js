import mongoose from "mongoose";

const tokenBlacklistSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true },
);

export const TokenBlacklistModel = mongoose.model(
  "TokenBlacklist",
  tokenBlacklistSchema,
);
