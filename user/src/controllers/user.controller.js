import { UserModel } from "../models/user.model";

export async function createUser(req, res) {
  try {
    const user = new UserModel(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};