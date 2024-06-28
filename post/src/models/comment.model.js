import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId }],
    replies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    discussion: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Discussion",
      required: true,
    },
  },
  { timestamps: true },
);

export const CommentModel = mongoose.model("Comment", CommentSchema);
