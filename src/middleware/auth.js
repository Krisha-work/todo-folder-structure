import { jwtDecode } from "jwt-decode";

// vrify token
const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];

    if (!token) return res.status(403).send({ message: "Token is required" });

    const decoded = jwtDecode(token);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(401).send("Invalid token");
  }
};

export default verifyToken;
