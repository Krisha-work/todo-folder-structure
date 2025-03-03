import bcryt from "bcryptjs";
import {
  findUserByUsername,
  addUser,
  findUserByEmailOrContact,
  findUserById,
  updateUserById,
  deleteUserById,
} from "../../database/user.js";
import { findTodosByUserId } from "../../database/todo.js";
import { loginValidation, registerValidtaion } from "../../modules/user.js";
import { createToken } from "../../middleware/createtoken.js";

export const register = async (req, res) => {
  const validationError = registerValidtaion(req.body);
  if (validationError !== true)
    return res
      .status(validationError.status || 400)
      .send({ message: validationError.message });

  const { username, email, password, contact } = req.body;
  try {
    const existingUser = await findUserByUsername(email);

    if (existingUser.length > 0)
      return res
        .status(409)
        .send({ message: "User already exists", existingUser });
    else {
      const hashedPassword = await bcryt.hash(password, 8);
      await addUser(username, email, hashedPassword, contact);

      return res.status(201).send({
        message: "User Register successfully",
        username,
        email,
        contact,
      });
    }
  } catch (err) {
    return res.status(500).send({ message: "Somthing went wrong in SignUp." });
  }
};

export const userLogin = async (req, res) => {
  const validationError = loginValidation(req.body);
  if (validationError !== true)
    return res
      .status(validationError.status || 400)
      .send({ message: validationError.message });

  const { emailOrContact, password } = req.body;

  try {
    const user = await findUserByEmailOrContact(emailOrContact);
    if (!user || !(await bcryt.compare(password, user.password)))
      return res.status(401).send({ message: "Invalid credential." });

    const token = createToken(user.id);
    return res.status(200).send({ message: "Login successful", token, user });
  } catch (err) {
    return res.status(500).send({ message: "Somthing went wrong in login" });
  }
};

export const logoutUser = async (req, res) => {
  const { id } = req.params;

  if (!req.userId) return res.status(404).send({ message: "user not found" });

  try {
    const user = await findUserById(id);

    if (!user) return res.status(404).send({ message: "User is not exist" });

    if (user.id !== req.userId)
      return res.status(400).send({ message: "You are not authorized" });

    const result = await findTodosByUserId(id);
    if (result.length > 0)
      return res.status(405).send({
        message: "can’t delete your self as todo is exist in your bucket",
      });

    await deleteUserById(req.userId);
    return res.status(200).json({ message: "Logout successfully" });
  } catch (err) {
    return res
      .status(500)
      .send({ message: "Somthing went wrong in user logout" });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;

  if (!req.userId)
    return res.status(404).send({ message: "userid not found in token." });

  const { username, email, password, contact } = req.body;
  try {
    const user = await findUserById(id);
    if (!user) return res.status(400).send({ message: "User is not exist" });

    if (user.id !== req.userId)
      return res
        .status(400)
        .send({ message: "User cannot access another's data" });

    // Prepare new data
    const newUsername = username || user.username;
    const newEmail = email || user.email;
    const newPassword = password
      ? await bcryt.hash(password, 8)
      : user.password;
    const newContact = contact || user.contact;

    // Update the user in the database
    await updateUserById(
      req.userId,
      newUsername,
      newEmail,
      newPassword,
      newContact
    );

    return res.status(200).send({
      message: "User data updated successfully",
      username: newUsername,
      email: newEmail,
      contact: newContact,
    });
  } catch (err) {
    return res
      .status(500)
      .send({ message: "Somthing went wrong in user update." });
  }
};

export const userShow = async (req, res) => {
  if (!req.userId)
    return res.status(404).send({ message: "userid not found in token." });

  try {
    const userData = await findUserById(req.userId);
    if (!userData) return res.status(400).send({ message: "user not found" });

    return res.status(200).send({ userData });
  } catch (err) {
    return res
      .status(500)
      .send({ message: "Somthong went wrong in user data get." });
  }
};
