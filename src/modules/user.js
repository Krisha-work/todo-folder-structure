import { StatusCode } from "../utils/helper/constant.js";
import {
  validUsername,
  validateEmail,
  validatePassword,
  validateContact,
  validateEmailOrContact
} from "../utils/validation/common-validation.js";

export const register_validtaion = (req, res) => {
  const { username, email, password, contact } = req;

//   const usernamValid = validUsername(username);
//   const emailvalidation = validateEmail(email);
//   const passValidation = validatePassword(password);
//   const contactValidation = validateContact(contact);

  if (validUsername(username)) {
    return res
      .status(validUsername(username).status || 400)
      .send({ message: validUsername(username).message });
  }
  if (validateEmail(email)) {
    return res
      .status(validateEmail(email).status || 400)
      .send({ message: validateEmail(email).message });
  }
  if (validatePassword(password)) {
    return res
      .status(validatePassword(password).status || 400)
      .send({ message: validatePassword(password).message });
  }
  if (validateContact(contact)) {
    return res
      .status(validateContact(contact).status || 400)
      .send({ message: validateContact(contact).message });
  }
  return true;
  
};


export const login_validation = (req, res) => {
  const { emailOrContact, password } = req.body;

//   const emailContactValidation = validateEmailOrContact(emailOrContact);
//   const passValidation = validatePassword(password);

  if (validateEmailOrContact(emailOrContact)) {
    return res
      .status(validateEmailOrContact(emailOrContact).status)
      .send({ message: validateEmailOrContact(emailOrContact).message });
  }
  if (validatePassword(password)) {
    return res
      .status(validatePassword(password).status)
      .send({ message: validatePassword(password).message });
  }

  return null;
};
