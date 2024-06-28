import mongoose from "mongoose";

const DiscussionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    text: { type: String, required: true },
    imageUrl: { type: String },
    tags: [String],
    createdBy: { type: mongoose.Schema.Types.ObjectId, required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId }],
    viewCount: { type: Number, default: 0 },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  },
  { timestamps: true },
);

export const DiscussionModel = mongoose.model("Discussion", DiscussionSchema);
