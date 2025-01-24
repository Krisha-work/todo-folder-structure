import jwt from "jsonwebtoken";
import bcryt from "bcryptjs";
import {
  findUserByUsername,
  addUser,
  findUserByEmailOrContact,
  findUserById,
  updateUserById,
  deleteUserById,
} from "../../database/user.js";
import { login_validation, register_validtaion } from "../../modules/user.js";
import { createToken } from "../../middleware/createtoken.js";

export const register = async (req, res) => {
  const validationError = register_validtaion(req.body);
  if (validationError !== true) {
    return res
      .status(validationError.status || 400)
      .send({ message: validationError.message });
  }

  const { username, email, password, contact } = req.body;
  try {
    const existingUser = await findUserByUsername(username);
    // console.log("mmmmmmmmmmmmmmmmmmm");
    // const userid = existingUser[0]?.id;
    // console.log(userid, "----8888888888888888888888888888-----");

    if (existingUser.length > 0) {
      res.status(409).send({
        message: "User already exists",
        existingUser,
      });
    } else {
      // Hash the password
      const hashedPassword = await bcryt.hash(password, 8);
      // Insert the new user into the database
      const userid = await addUser(username, email, hashedPassword, contact);

      // Send a success response
      res.status(201).send({
        message: "Signup data inserted successfully",
        // userid,
        username,
        email,
        contact,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Somthing went wrong in SignUp." });
  }
};

export const userLogin = async (req, res) => {
  const validationError = login_validation(req.body);
  if (validationError !== true) {
    return res
      .status(validationError.status || 400)
      .send({ message: validationError.message });
  }

  const { emailOrContact, password } = req.body;

  try {
    const user = await findUserByEmailOrContact(emailOrContact);
    if (!user) {
      return res
        .status(401)
        .send({ message: "Invalid credentials in email or Contact." });
    }
    if (!(await bcryt.compare(password, user.password))) {
      return res
        .status(401)
        .send({ message: "Invalid credentials in Password." });
    }

    const token = createToken(user.id);

    res.status(200).send({ message: "Login successful", token, user });
  } catch (err) {
    console.log(err);

    res.status(500).send({ message: "Somthing went wrong in login" });
  }
};

export const logoutUser = async (req, res) => {
  const { id } = req.params;

  if (!req.userId) {
    res.status(404).send({ message: "user not found" });
  }

  try {
    const user = await findUserById(id);

    // const userInputId = matchIdResult.rows[0];
    if (!user) {
      return res.status(404).send({
        message: "User is not exist",
      });
    }
    if (user.id !== req.userId) {
      return res.status(400).send({ message: "You are not authorized" });
    }
    // console.log("-------not emty todo");

    await deleteUserById(req.userId);
    res.status(200).json({ message: "Logout successfully" });
  } catch (err) {
    res
      .status(500)
      .send({ message: "Somthing went wrong in user logout" });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;

  if (!req.userId) {
    res.status(404).send({ message: "userid not found in token." });
  }

  // const validationError = update_user_validation(req.body);
  // if (validationError !== true) {
  //   return res
  //     .status(validationError.status || 400)
  //     .send({ message: validationError.message });
  // }

  const { username, email, password, contact } = req.body;
  try {
    const user = await findUserById(id);
    if (!user) {
      return res.status(400).send({ message: "User is not exist" });
    }
    if (user.id !== req.userId) {
      return res
        .status(400)
        .send({ message: "User cannot access another's data" });
    }

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

    res.status(200).send({
      message: "User data updated successfully",
      username: newUsername,
      email: newEmail,
      contact: newContact,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Somthing went wrong in user update." });
  }
};

export const userShow = async (req, res) => {
  if (!req.userId) {
    res.status(404).send({ message: "userid not found in token." });
  }

  try {
    const userData = await findUserById(req.userId);
    if (!userData) {
      res.status(400).send({ message: "user not found" });
    }
    res.status(200).send({ userData });
  } catch (err) {
    res.status(500).send({ message: "Somthong went wrong in user data get." });
  }
};

// export default { register, userLogin, updateUser, logoutUser };
