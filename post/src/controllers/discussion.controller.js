import { DiscussionModel } from "../models/discussion.model.js";
import { CommentModel } from "../models/comment.model.js";

export async function createDiscussion(req, res) {
  try {
    const discussion = new DiscussionModel({
      ...req.body,
      createdBy: req.user._id,
    });
    await discussion.save();
    res.status(201).send(discussion);
  } catch (error) {
    res.status(400).send(error);
  }
}

export async function updateDiscussion(req, res) {
  try {
    const discussion = await DiscussionModel.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user._id },
      req.body,
      { new: true, runValidators: true },
    );

    if (!discussion) {
      return res.status(404).send();
    }
    res.send(discussion);
  } catch (error) {
    res.status(400).send(error);
  }
}

export async function deleteDiscussion(req, res) {
  try {
    const discussion = await DiscussionModel.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user._id,
    });
    if (!discussion) {
      return res.status(404).send();
    }
    res.send(discussion);
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function getDiscussionsByTags(req, res) {
  try {
    const discussions = await DiscussionModel.find({
      tags: { $in: req.query.tags.split(",") },
    });
    res.send(discussions);
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function getDiscussionsByText(req, res) {
  try {
    const discussions = await DiscussionModel.find({
      text: new RegExp(req.query.text, "i"),
    });
    res.send(discussions);
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function likeDiscussion(req, res) {
  try {
    const discussion = await DiscussionModel.findById(req.params.id);
    if (!discussion.likes.includes(req.user._id)) {
      discussion.likes.push(req.user._id);
      await discussion.save();
    }
    res.send(discussion);
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function incrementViewCount(req, res) {
  try {
    const discussion = await DiscussionModel.findById(req.params.id);
    if (!discussion) {
      return res.status(404).send();
    }

    discussion.viewCount += 1;
    await discussion.save();

    res.send(discussion);
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function getViewCount(req, res) {
  try {
    const discussion = await DiscussionModel.findById(req.params.id);
    if (!discussion) {
      return res.status(404).send();
    }
    res.send({ viewCount: discussion.viewCount });
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function commentOnDiscussion(req, res) {
  try {
    const comment = new CommentModel({
      ...req.body,
      createdBy: req.user._id,
      discussion: req.params.id,
    });
    await comment.save();

    const discussion = await DiscussionModel.findById(req.params.id);
    discussion.comments.push(comment._id);
    await discussion.save();

    res.status(201).send(comment);
  } catch (error) {
    res.status(400).send(error);
  }
}
