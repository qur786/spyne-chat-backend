import { CommentModel } from "../models/comment.model.js";
import { DiscussionModel } from "../models/discussion.model.js";

export async function replyToComment(req, res) {
  try {
    const reply = new CommentModel({
      ...req.body,
      createdBy: req.user._id,
      discussion: req.params.discussionId,
    });
    await reply.save();

    const comment = await CommentModel.findById(req.params.commentId);
    comment.replies.push(reply._id);
    await comment.save();

    res.status(201).send(reply);
  } catch (error) {
    res.status(400).send(error);
  }
}

export async function deleteComment(req, res) {
  try {
    const comment = await CommentModel.findOneAndDelete({
      _id: req.params.commentId,
      createdBy: req.user._id,
    });
    if (!comment) {
      return res.status(404).send();
    }

    // Remove the comment ID from the associated discussion's comments array
    await DiscussionModel.findByIdAndUpdate(comment.discussion, {
      $pull: { comments: comment._id },
    });

    res.send(comment);
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function updateComment(req, res) {
  try {
    const comment = await CommentModel.findOneAndUpdate(
      { _id: req.params.commentId, createdBy: req.user._id },
      req.body,
      { new: true, runValidators: true },
    );

    if (!comment) {
      return res.status(404).send();
    }
    res.send(comment);
  } catch (error) {
    res.status(400).send(error);
  }
}

export async function likeComment(req, res) {
  try {
    const comment = await CommentModel.findById(req.params.commentId);
    if (!comment.likes.includes(req.user._id)) {
      comment.likes.push(req.user._id);
      await comment.save();
    }
    res.send(comment);
  } catch (error) {
    res.status(400).send(error);
  }
}
