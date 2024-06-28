import express, { json, urlencoded } from "express";
import {
  login,
  logout,
  checkAuth,
  register,
} from "./controllers/auth.controller.js";
import { isAuthenticated } from "./middleware/auth.middleware.js";
import mongoose from "mongoose";

import "dotenv/config";

const app = express();

app.use(json());
app.use(
  urlencoded({
    extended: false,
  }),
);

app.post("/login", login);
app.post("/logout", isAuthenticated, logout);
app.get("/check-auth", isAuthenticated, checkAuth);
app.post("/register", register);

mongoose
  .connect(process.env.MONGO_URL ?? "")
  .then(() => {
    console.log("Connected to database");

    // Start the server
    const port = process.env.PORT ?? 3002;
    app.listen(port, () => {
      console.log(`Auth micro-service is listening on ${port}`);
    });
  })
  .catch(console.log);
