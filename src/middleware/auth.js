import jwt from "jsonwebtoken";
import { jwtDecode } from "jwt-decode";

// vrify token
const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    console.log(token, "token----------------------");

    if (!token) {
      res.status(403).send("Token is required");
      return;
    }
    const decoded = jwtDecode(token)
    console.log(decoded, "decoded====================");
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).send("Invalid token");
  }
};

export default verifyToken;
