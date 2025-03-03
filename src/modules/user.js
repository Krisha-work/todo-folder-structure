import {
  validUsername,
  validateEmail,
  validatePassword,
  validateContact,
  validateEmailOrContact,
} from "../utils/validation/common-validation.js";

export const registerValidtaion = (body) => {
  const { username, email, password, contact } = body;

  const usernamValid = validUsername(username);
  const emailvalidation = validateEmail(email);
  const passValidation = validatePassword(password);
  const contactValidation = validateContact(contact);

  if (usernamValid !== true) {
    return usernamValid;
  }
  if (emailvalidation !== true) {
    return emailvalidation;
  }
  if (passValidation !== true) {
    return passValidation;
  }
  if (contactValidation !== true) {
    return contactValidation;
  }

  return true;
};


export const loginValidation = (body) => {
  const { emailOrContact, password } = body;

  const emailContactValidation = validateEmailOrContact(emailOrContact);
  const passValidation = validatePassword(password);

  if (emailContactValidation) {
    return emailContactValidation;
  }
  if (passValidation) {
    return passValidation;
  }

  return true;
};

export const updateUserValidation = (body) => {
  const { username, email, password, contact } = body;

  const usernamValid = validUsername(username);
  const emailvalidation = validateEmail(email);
  const passValidation = validatePassword(password);
  const contactValidation = validateContact(contact);

  if (usernamValid !== true) {
    return usernamValid;
  } else if (emailvalidation !== true) {
    return emailvalidation;
  } else if (passValidation !== true) {
    return passValidation;
  } else if (contactValidation !== true) {
    return contactValidation;
  }
  return true;
};
