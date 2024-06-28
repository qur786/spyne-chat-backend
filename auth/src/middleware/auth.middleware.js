import axios from "axios";
import jwt from "jsonwebtoken";
import { TokenBlacklistModel } from "../models/token.model.js";

export async function isAuthenticated(req, res, next) {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");

    // Check if the token is blacklisted
    const blacklistedToken = await TokenBlacklistModel.findOne({ token });
    if (blacklistedToken) {
      throw new Error("Token is blacklisted");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const response = await axios.get(
      `${process.env.USER_SERVICE_URL}/${decoded._id}`,
    );

    if (!response.data) {
      throw new Error();
    }

    req.user = response.data;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate." });
  }
}
