import db from "./index.js";
import { todoQuery } from "./queries.js";

export const addTodo = async (title, description, userId) => {
  try {
    const data = await db.query(todoQuery.addTodo, [
      title,
      description,
      userId,
    ]);
    const todoId = data.rows[0].id;
    return todoId;
  } catch (error) {
    throw new Error("Database insert error: " + error.message);
  }
};

export const getUsernameByUserId = async (userId) => {
  try {
    const result = await db.query(todoQuery.userTodoJoin, [userId]);
    return result.rows[0]?.username || null;
  } catch (error) {
    throw new Error("Database query error: " + error.message);
  }
};

export const findTodoById = async (todoId, userId) => {
  try {
    const result = await db.query(todoQuery.matchTodoId, [todoId, userId]);
    return result.rows[0] || null;
  } catch (error) {
    throw new Error("Database query error: " + error.message);
  }
};

export const updateTodoById = async (todoId, userId, title, description) => {
  try {
    await db.query(todoQuery.updateTodo, [title, description, todoId, userId]);
    return true;
  } catch (error) {
    throw new Error("Database update error: " + error.message);
  }
};

export const findTodosByUserId = async (userId) => {
  try {
    const result = await db.query(todoQuery.matchUserId, [userId]);
    return result.rows || [];
  } catch (error) {
    throw new Error("Database query error: " + error.message);
  }
};

export const deleteTodoByIdAndUserId = async (todoId, userId) => {
  try {
    await db.query(todoQuery.deleteTodo, [todoId, userId]);
  } catch (error) {
    throw new Error("Database delete error: " + error.message);
  }
};
