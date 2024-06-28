import axios from "axios";

export async function isAuthenticated(req, res, next) {
  try {
    const response = await axios(`${process.env.AUTH_SERVICE_URL}/check-auth`, {
      headers: {
        Authorization: req.header("Authorization"),
      },
    });
    const user = response.data;
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
}
