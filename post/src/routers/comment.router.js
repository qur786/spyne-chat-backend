import express from "express";
import {
  replyToComment,
  deleteComment,
  updateComment,
  likeComment,
} from "../controllers/comment.controller.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";

export const commentRouter = express.Router();

commentRouter.post(
  "/:discussionId/:commentId/replies",
  isAuthenticated,
  replyToComment,
);
commentRouter.delete("/:commentId", isAuthenticated, deleteComment);
commentRouter.patch("/:commentId", isAuthenticated, updateComment);
commentRouter.post("/:commentId/like", isAuthenticated, likeComment);
