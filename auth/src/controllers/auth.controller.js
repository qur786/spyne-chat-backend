import axios from "axios";
import jwt from "jsonwebtoken";
import { TokenBlacklistModel } from "../models/token.model.js";

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const response = await axios.post(`${process.env.USER_SERVICE_URL}/login`, {
      email,
      password,
    });

    if (response.data && response.data.user) {
      const token = jwt.sign(
        { _id: response.data.user._id },
        process.env.JWT_SECRET,
      );
      res.send({ user: response.data.user, token });
    } else {
      res.status(401).send({ error: "Login failed" });
    }
  } catch (error) {
    res.status(400).send(error);
  }
}

export async function logout(req, res) {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const blacklistedToken = new TokenBlacklistModel({ token });
    await blacklistedToken.save();
    res.send({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function checkAuth(req, res) {
  res.send(req.user);
}

export async function register(req, res) {
  try {
    const response = await axios.post(
      `${process.env.USER_SERVICE_URL}`,
      req.body,
    );
    res.status(201).send(response.data);
  } catch (error) {
    res.status(400).send(error);
  }
}
