import {
  addTodo,
  getUsernameByUserId,
  findTodoById,
  updateTodoById,
  findTodosByUserId,
  deleteTodoByIdAndUserId,
} from "../../database/todo.js";
import { todoAddValidation } from "../../modules/todo.js";

export const todo_add = async (req, res) => {
  if (!req.userId)
    return res.status(404).send({ message: "User Id not found in token." });

  const validationError = todoAddValidation(req.body);
  if (validationError !== true)
    return res
      .status(validationError.status || 400)
      .send({ message: validationError.message });

  const { title, description } = req.body;
  try {
    await addTodo(title, description, req.userId);

    const username = await getUsernameByUserId(req.userId);

    return res.status(201).send({
      message: "To-Do Add successfully",
      title,
      description,
      username,
    });
  } catch (err) {
    return res
      .status(500)
      .send({ message: "Somthing went wrong in todo create" });
  }
};

export const todo_update = async (req, res) => {
  if (!req.userId) return res.status(404).send({ message: "user not found" });

  const { title, description } = req.body;
  const { id } = req.params;
  try {
    const todo = await findTodoById(id, req.userId);

    if (!todo) return res.status(404).send({ message: "Todo not found" });

    const newTitle = title || todo.title;
    const newDescription = description || todo.description;

    await updateTodoById(id, req.userId, newTitle, newDescription);

    return res.status(200).send({
      message: "To-Do updated successfully",
      id,
      title: newTitle,
      description: newDescription,
    });
  } catch (err) {
    return res
      .status(500)
      .send({ message: "Somthing went wrong in todo update" });
  }
};

export const todos_show = async (req, res) => {
  const { id } = req.userId;

  if (!req.userId)
    return res.status(404).send({ userId: id, message: "user not found" });

  try {
    const todos = await findTodosByUserId(req.userId);
    console.log(todos);

    return res.status(200).send({ todos });
  } catch (err) {
    return res
      .status(500)
      .send({ message: "Somthing went wrong in todo get." });
  }
};

export const todo_show = async (req, res) => {
  const userId = req.userId;
  if (!req.userId)
    return res.status(404).send({ userId: userId, message: "user not found" });

  const { id } = req.params;

  try {
    const todo = await findTodoById(id, req.userId);
    return res.status(200).send({ todo });
  } catch (err) {
    return res
      .status(500)
      .send({ message: "Somthing went wrong in todo get." });
  }
};

export const todo_delete = async (req, res) => {
  if (!req.userId) return res.status(401).send({ message: "user not found" });

  const { id } = req.params;

  try {
    const todo = await findTodoById(id, req.userId);

    if (!todo)
      return res
        .status(404)
        .send({ message: "you can not authries to delete." });

    await deleteTodoByIdAndUserId(id, req.userId);
    return res.status(200).send({ message: "To-Do deleted successfully", id });
  } catch (err) {
    return res
      .status(500)
      .send({ message: "somthing went erong in todo delete" });
  }
};
