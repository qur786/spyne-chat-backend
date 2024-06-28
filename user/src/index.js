import express from "express";

const app = express();

app.get("/", (_req, res) => {
    res.json({ message: "Welcome Home!" });
})

// Start the server
const port = process.env.PORT ?? 3001;
app.listen(port, () => {
  console.log(`user micro-service is listening on ${port}`);
});