// import {
//   validateContact,
//   validateEmail,
//   validatePassword,
//   validateEmailOrContact,
// } from "../utils/validation";

// export const register = async (data) ={
//     const username = data
//     if (!username) {
//     return res.status(400).send({ message: "Username is requrie" });
//   }
//   if (!email) {
//     return res.status(400).send({ message: "Email is requrie" });
//   }
//   if (!password) {
//     return res.status(400).send({ message: "Password is requrie" });
//   }
//   if (!contact) {
//     return res.status(400).send({ message: "Contact is requrie" });
//   }
//   if (!validateEmail(email)) {
//     return res.status(400).send({ message: "Email format does not match" });
//   }
//   if (!validatePassword(password)) {
//     return res.status(400).send({ message: "Password format does not match" });
//   }
//   if (!validateContact(contact)) {
//     return res.status(400).send({ message: "Contact format does not match" });
//   }

// }