import axios from "axios";

export async function isAuthenticated(req, res, next) {
  try {
    const user = await axios(`${process.env.AUTH_SERVICE_URL}/check-auth`);
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
}
