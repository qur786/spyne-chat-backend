import { UserModel } from "../models/user.model.js";

export async function createUser(req, res) {
  try {
    const user = new UserModel(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
}

export async function verifyUser(req, res) {
  try {
    const user = await UserModel.findByCredentials(
      req.body.email,
      req.body.password,
    );
    res.send({ user });
  } catch (error) {
    res.status(400).send({ error: "Login failed" });
  }
}

export async function updateUser(req, res) {
  try {
    const user = await UserModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
}

export async function deleteUser(req, res) {
  try {
    const user = await UserModel.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
}

export async function getUser(req, res) {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
}

export async function listUsers(_req, res) {
  try {
    const users = await UserModel.find({});
    res.send(users);
  } catch (error) {
    res.status(400).send(error);
  }
}

export async function searchUsers(req, res) {
  try {
    const { q } = req.query;
    const regex = new RegExp(q, "i");
    const users = await UserModel.find({
      name: { $regex: regex },
    });
    res.send(users);
  } catch (error) {
    res.status(400).send(error);
  }
}

export async function followUser(req, res) {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    if (!user.followers.includes(req.user._id)) {
      user.followers.push(req.user._id);
      await user.save();
    }
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
}
