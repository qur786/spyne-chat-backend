import express from "express";
import httpProxy from "http-proxy";

const proxy = httpProxy.createProxyServer();
const app = express();

// Route requests to the user service
app.use("/user", (req, res) => {
  proxy.web(req, res, { target: "http://user:3001" });
});

// Route requests to the auth service
app.use("/auth", (req, res) => {
  proxy.web(req, res, { target: "http://auth:3002" });
});

// Start the server
const port = process.env.PORT ?? 3000;
app.listen(port, () => {
  console.log(`API Gateway listening on port ${port}`);
});
