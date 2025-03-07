import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import apiRouter from "./api/index.js";
import { StatusCode } from "./utils/constant.js";
import "path";

// SWEGGER LIBRARIES
// import swaggerUi from "swagger-ui-express";
// import swaggerDocument from "./swagger/swagger-output.json" with { type: "json" };

const app = express();

const start_server = async () => {
  try {
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cors());
    app.use(express.json());

    app.get("/", (req, res) => {
      res.status(StatusCode.SUCCESS).send({ message: "This is home page" });
    });

    //SWAGGER API
    // app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    app.use("/api", apiRouter);
    app.get("/health", (req, res) => {
      return res
        .status(StatusCode.SUCCESS)
        .send({ message: "Ok, Working fine." });
    });

    app.listen(process.env.SERVER_PORT, () =>
      console.log(
        `Server running on http://localhost:${process.env.SERVER_PORT}`
      )
    );
  } catch (err) {
    console.log("server Error");
    res
      .status(StatusCode.INTERNAL_SERVER_ERROR)
      .send({ message: "Server Error" });
  }
};

export { app, start_server };
