import db from "./index.js";
import { userQuery } from "./queries.js";

export const findUserByUsername = async (email) => {
  try {
    const result = await db.query(userQuery.matchUsername, [email]);
    return result.rows;
  } catch (error) {
    throw new Error("Database query error: " + error.message);
  }
};

export const addUser = async (username, email, hashedPassword, contact) => {
  try {
    const result = await db.query(userQuery.addUser, [
      username,
      email,
      hashedPassword,
      contact,
    ]);
    return result.rows[0].id;
  } catch (error) {
    throw new Error("Database insertion error: " + error.message);
  }
};

export const findUserByEmailOrContact = async (emailOrContact) => {
  try {
    const result = await db.query(userQuery.matchEmailOrContact, [
      emailOrContact,
    ]);
    return result.rows[0]; // Return a single user object if found
  } catch (error) {
    throw new Error("Database query error: " + error.message);
  }
};

export const findUserById = async (userId) => {
  try {
    const result = await db.query(userQuery.matchUserId, [userId]);
    return result.rows[0]; // Return a single user object if found
  } catch (error) {
    throw new Error("Database query error: " + error.message);
  }
};

export const updateUserById = async (
  userId,
  username,
  email,
  password,
  contact,
  profile_image
) => {
  try {
    await db.query(userQuery.updateUser, [
      username,
      email,
      password,
      contact,
      profile_image,
      userId,
    ]);
    return true;
  } catch (error) {
    throw new Error("Database update error: " + error.message);
  }
};

export const deleteUserById = async (userId) => {
  try {
    const result = await db.query(userQuery.deleteUser, [userId]);
    return result.rows[0]; // Return the deleted user if needed
  } catch (error) {
    throw new Error("Database deletion error: " + error.message);
  }
};
