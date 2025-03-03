import express from "express";

import verifyToken from "../../middleware/auth.js";
import {
  todo_add,
  todos_show,
  todo_show,
  todo_update,
  todo_delete,
} from "../controllers/todo.js";

const app = express.Router();

app.use(verifyToken);
app.post("/todoadd", todo_add);
app.get("/todos", todos_show);
app.get("/todo/:id", todo_show);
app.put("/todo/:id", todo_update);
app.delete("/remove/:id", todo_delete);

export default app;
