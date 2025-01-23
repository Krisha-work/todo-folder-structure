import db from "../../database/index.js";
import { addTodo, getUsernameByUserId, findTodoById, updateTodoById, findTodosByUserId, deleteTodoByIdAndUserId } from "../../database/todo.js";
import {todo_add_validation} from "../../modules/todo.js";

export const todo_add = async (req, res) => {
  if (!req.userId) {
    res.status(404).send({ message: "user not found" });
  }

  const validationError = todo_add_validation(req.body);
  if (validationError !== true) {
    return res
      .status(validationError.status || 400)
      .send({ message: validationError.message });
  }

  const { title, description } = req.body;
  try {
    const result = await addTodo(title, description, req.userId);

    console.log(result, "result todo-------------------");
    
    const username = await getUsernameByUserId(req.userId);

    res.status(201).send({
      message: "to do data insert successfully",
      // result,
      title,
      description,
      username,
    });
  } catch (err) {
    console.log(err, "---------------------");
    
    res.status(500).send({ message: "An error occurred during ToDo." });
  }
};

export const todo_update = async (req, res) => {
  if (!req.userId) {
    res.status(404).send({ message: "user not found" });
  }

  // const validationError = todo_update_validation(req.body);
  // if (validationError !== true) {
  //   return res
  //     .status(validationError.status || 400)
  //     .send({ message: validationError.message });
  // }

  const { title, description } = req.body;
  const {id} = req.params;
  try {
    const todo = await findTodoById(id, req.userId);

    if (!todo) {
      res.status(404).send({ message: "Todo not found" });
    } 
    
    // Set new values if provided, otherwise keep existing ones
    const newTitle = title || todo.title;
    const newDescription = description || todo.description;

    // Update To-Do in the database
    await updateTodoById(id, req.userId, newTitle, newDescription);

    res.status(200).send({
      message: "To-Do updated successfully",
      id,
      title: newTitle,
      description: newDescription,
    });
  } catch (err) {
    res.status(500).send({ message: "you can not access another user data" });
  }
};

export const todo_show = async (req, res) => {
  const {id} = req.userId;

  if (!req.userId) {
    res.status(404).send({ userId: id, message: "user not found" });
  }

  try {
    const todos = await findTodosByUserId(req.userId);
    res.status(200).send({ todos });
  } catch (err) {
    res.status(500).send({ message: "An error occurred during ToDo." });
  }
};

export const todo_delete = async (req, res) => {
  if (!req.userId) {
    res.status(404).send({ message: "user not found" });
  }
  const {id} = req.params;

  try {
    const todo = await findTodoById(id, req.userId);


    if (!todo) {
      res.status(405).send({ message: "you can not authries to delete." });
    } 
    await deleteTodoByIdAndUserId(id, req.userId);
    res.status(200).send({ message: "To-Do deleted successfully", id });
  } catch (err) {
    res.status(401).send({ message: "to do not deleted" });
  }
};
