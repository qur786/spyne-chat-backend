import express, { json, urlencoded } from "express";
import mongoose from "mongoose";
import { discussionRouter } from "./routers/discussion.router.js";
import { commentRouter } from "./routers/comment.router.js";

import "dotenv/config";

const app = express();

app.use(json());
app.use(
  urlencoded({
    extended: false,
  }),
);

app.use("/discussion", discussionRouter);
app.use("/comment", commentRouter);

mongoose
  .connect(process.env.MONGO_URL ?? "")
  .then(() => {
    // Start the server
    const port = process.env.PORT ?? 3003;
    app.listen(port, () => {
      console.log(`Dicussion micro-service is listening on ${port}`);
    });
  })
  .catch(console.log);
