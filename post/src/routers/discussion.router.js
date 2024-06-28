import express from "express";
import {
  createDiscussion,
  updateDiscussion,
  deleteDiscussion,
  getDiscussionsByTags,
  getDiscussionsByText,
  likeDiscussion,
  incrementViewCount,
  getViewCount,
  commentOnDiscussion,
} from "../controllers/discussion.controller.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";

export const discussionRouter = express.Router();

discussionRouter.post("/", isAuthenticated, createDiscussion);
discussionRouter.patch("/:id", isAuthenticated, updateDiscussion);
discussionRouter.delete("/:id", isAuthenticated, deleteDiscussion);
discussionRouter.get("/tags", getDiscussionsByTags);
discussionRouter.get("/search", getDiscussionsByText);
discussionRouter.post("/:id/like", isAuthenticated, likeDiscussion);
discussionRouter.post("/:id/view", incrementViewCount);
discussionRouter.get("/:id/viewCount", getViewCount); // New route
discussionRouter.post("/:id/comment", isAuthenticated, commentOnDiscussion);
