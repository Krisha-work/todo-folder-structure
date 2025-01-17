import db from "../../database/index.js";
import jwt from "jsonwebtoken";
import bcryt from "bcryptjs";
// import  userQueries  from "../../utils/user.js";

import {
  validateEmailOrContact,
  validatePassword,
  validateContact,
  validateEmail,
} from "../../utils/validation.js";

export const register = async (req, res) => {
  // console.log(userQueries.matchUser, "user part query");

  // const posted_data = req.body
  const { username, email, password, contact } = req.body;
  if (!username) {
    return res.status(400).send({ message: "Username is requrie" });
  }
  if (!email) {
    return res.status(400).send({ message: "Email is requrie" });
  }
  if (!validateEmail(email)) {
    return res.status(400).send({ message: "Enter valid Email format" });
  }
  if (!password) {
    return res.status(400).send({ message: "Password is requrie" });
  }
  if (!validatePassword(password)) {
    return res.status(400).send({
      message:
        "Password must be 8 charcters, one special symbol, one numeric, on Alphabet.",
    });
  }
  if (!contact) {
    return res.status(400).send({ message: "Contact is requrie" });
  }
  if (!validateContact(contact)) {
    return res.status(400).send({ message: "Contact must be 10 digit" });
  }

  try {
    const matchUsernameResult = await db.query(
      "SELECT * FROM userdata WHERE username = $1;",
      [username]
    );

    if (matchUsernameResult.rows.length > 0) {
      return res.status(400).send({
        message: "User already exists",
        username: username,
        email: email,
      });
    }

    // Hash the password
    const hashedPassword = await bcryt.hash(password, 8);

    // Insert the new user into the database
    const result = await db.query(
      "INSERT INTO userdata (username, email, password, contact) VALUES ($1, $2, $3, $4) RETURNING id;",
      [username, email, hashedPassword, contact]
    );

    // Send a success response
    res.status(200).send({
      message: "Signup data inserted successfully",
      username: username,
      email: email,
      contact: contact,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "An error occurred during signup." });
  }
};

export const userLogin = async (req, res) => {
  const { emailOrContact, password } = req.body;
  if (!emailOrContact) {
    return res.status(400).send({ message: "Email or Contact are required." });
  }

  if (!password) {
    return res.status(400).send({ message: "Password is required." });
  }


  try {
    const result = await db.query(
      "SELECT * FROM userdata WHERE email=$1 OR contact=$1",
      [emailOrContact]
    );
    const user = result.rows[0];

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

    const token = jwt.sign({ userId: user.id }, process.env.SESSION_SECRET, {
      expiresIn: "1d",
    });
    console.log(token, "login token==============");

    res.status(200).send({ message: "Login successful", token, user });
  } catch (err) {
    res.status(500).send({ message: "An error occurred during login." });
  }
};

export const logoutUser = async (req, res) => {
  const id = req.params;
  if (!req.userId) {
    res.status(404).send({ message: "user not found" });
  }

  try {
    const matchIdResult = await db.query(
      "SELECT * FROM userdata WHERE id = $1;",
      [id.id]
    );

    const userInputId = matchIdResult.rows[0];
    if (userInputId === undefined) {
      return res.status(400).send({
        message: "User is not exist",
      });
    } else {
      if (matchIdResult.rows[0].id == req.userId) {
        // Insert the new user into the database
        const result = await db.query("delete from userdata where id=$1", [
          req.userId,
        ]);
        const userRead = result.rows[0];

        // Send a success response
        res.status(200).json({ message: "Logout successfully", userRead });
      } else {
        return res.status(400).send({
          message: "You have not authorise user ",
        });
      }
    }
  } catch (err) {
    console.error(err?.message, "errror stack", err?.stack);
    res
      .status(500)
      .send({ message: "your todo is not empty so you can not logout." });
  }
};

export const updateUser = async (req, res) => {
  const id = req.params;

  if (!req.userId) {
    res.status(404).send({ message: "user not found" });
  }

  const { username, email, password, contact } = req.body;
  console.log(password, "-----------");

  try {
    const matchIdResult = await db.query(
      "SELECT * FROM userdata WHERE id = $1;",
      [id.id]
    );

    const userInputId = matchIdResult.rows[0];
    if (!userInputId) {
      return res.status(400).send({
        message: "User is not exist",
      });
    } else {
      if (matchIdResult.rows[0].id == req.userId) {
        // Validate input fields

        // if (!validateEmail(email)) {
        //   return res
        //     .status(400)
        //     .send({ message: "Email format does not match" });
        // }
        // if (!validatePassword(password)) {
        //   return res
        //     .status(400)
        //     .send({ message: "Password format does not match" });
        // }
        // if (!validateContact(contact)) {
        //   return res
        //     .status(400)
        //     .send({ message: "Contact format does not match" });
        // }

        // Hash the password
        let newUsername = matchIdResult.rows[0].username;
        let newEmail = matchIdResult.rows[0].email;
        let newPassword = matchIdResult.rows[0].password;
        let newContact = matchIdResult.rows[0].contact;

        if (username) newUsername = username;
        if (email) newEmail = email;
        if (password) newPassword = await bcryt.hash(password, 8);
        if (contact) newContact = contact;

        // Insert the new user into the database
        await db.query(
          "UPDATE userdata SET username = coalesce ($1, username), email = coalesce($2, email), password = coalesce($3, password), contact = coalesce($4, contact) WHERE id=$5;",
          [newUsername, newEmail, newPassword, newContact, req.userId]
        );

        // Send a success response
        res.status(200).send({
          message: "Signup data update successfully",
          username: username,
          email: email,
          contact: contact,
        });
        ``;
      } else {
        return res.status(400).send({
          message: "User can not access another data",
        });
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "An error occurred during signup." });
  }
};

export const userShow = async (req, res) => {
  console.log(req.userId);

  if (!req.userId) {
    res.status(404).send({ message: "user not found" });
  }

  try {
    const result = await db.query("select * from userdata  where id=$1 ", [
      req.userId,
    ]);
    // console.log(result, "result");
    
    const userData = result.rows;
    console.log(userData, "user data");
    if(!userData[0]){
      res.status(400).send({message: "user not found"})
    }
    
    res.status(200).send({ userData });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err });
  }
};
// export default { register, userLogin, updateUser, logoutUser };
