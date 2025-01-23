import {
  validTitle,
  validDescription,
} from "../utils/validation/common-validation.js";

export const todo_add_validation= (body) => {
  const { title, description } = body;

  const titleValid = validTitle(title);
  const descriptionValid = validDescription(description);

  if (titleValid != true) {
    return titleValid;
  }
  if (descriptionValid !== true) {
    return descriptionValid;
  }

  return true;
};

export const todo_update_validation= (body) => {
    const { title, description } = body;
  
    const titleValid = validTitle(title);
    const descriptionValid = validDescription(description);
  
    if (titleValid != true) {
      return titleValid;
    }
    else if (descriptionValid !== true) {
      return descriptionValid;
    }
  
    return true;
  };
