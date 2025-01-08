import express from "express";
import bodyParser from "body-parser";
import apiRouter from "./api/index.js";
import "path";
// import env f
// rom "dotenv";
// env.config();

const app = express();
// const port = process.env.SERVER_PORT;
// console.log(port, " port-------------");

const start_server = async () => {
  try {
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.json());

    app.get("/", (req, res) => {
      res.send({ message: "This is home page" });
    });

    app.use("/api", apiRouter);
    app.get("/health", function (req, res) {
      return res.send("Ok, Working fine.");
    });

    app.listen(process.env.SERVER_PORT || 3000, () =>
      console.log(
        `Server running on http://localhost:${process.env.SERVER_PORT || 3000}`
      )
    );
  } catch (err) {
    console.log("server Error");
  }
};

export default start_server;
