import express, { json, urlencoded } from "express";
import { isAuthenticated } from "./middlewares/auth.middleware.js";
import mongoose from "mongoose";
import { createUser, updateUser, deleteUser, getUser, listUsers, searchUsers, followUser } from "./controllers/user.controller.js";

import 'dotenv/config';

const app = express();

app.use(json());
app.use(urlencoded({
  extended: false
}));

app.post('/', createUser);
app.put('/:id', isAuthenticated, updateUser);
app.delete('/:id', isAuthenticated, deleteUser);
app.get('/search', searchUsers); // This should come before '/:id'
app.get('/:id', getUser);
app.get('/', listUsers);
app.post('/:id/follow', isAuthenticated, followUser);

mongoose.connect(process.env.MONGO_URL ?? "").then(() => {
  console.log("Connected to database")
  
  // Start the server
  const port = process.env.PORT ?? 3001;
  app.listen(port, () => {
    console.log(`user micro-service is listening on ${port}`);
  });
})
.catch(console.log)