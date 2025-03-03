import jwt from "jsonwebtoken";

export const createToken = (userid) => {
  const token = jwt.sign({ userId: userid }, process.env.SESSION_SECRET, {
    expiresIn: "1d",
  });
  return token;
};
