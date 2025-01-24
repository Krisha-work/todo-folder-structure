import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "My api DRUD",
    description: "Api CURD perfom on user and todo",
  },
  host: "localhost:3000",
};

const outputFile = "./swagger-output.json";
const routes = ["../api/routes/user.js", "../api/routes/todo.js"];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
  root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen()(outputFile, routes, doc);
