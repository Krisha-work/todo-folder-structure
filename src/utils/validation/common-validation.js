import { StatusCode } from "../helper/constant.js";

export const validUsername = (username) =>{
  if(!username){
    return{
      status: StatusCode.BAD_REQUEST,
      message:"Username is requrie"
    }
  }
  return true
}

export const validatePassword = (password) => {
  if (!password) {
    return {
      status: StatusCode.BAD_REQUEST,
      message: "Password is required",
    };
  }

  const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!regex.test(password)) {
    return {
      status: StatusCode.BAD_REQUEST,
      message:
        "Password must be 8 charcters, one special symbol, one numeric, on Alphabet.",
    };
  }

  return regex.test(password);
};

export const validateEmail = (email) => {
  if (!email) {
    return {
      status: StatusCode.BAD_REQUEST,
      message: "Email is requrie",
    };
  }

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email)) {
    return {
      status: StatusCode.BAD_REQUEST,
      message: "Enter valid Email format.",
    };
  }
  return regex.test(email);
};

export const validateContact = (contact) => {
  if(!contact){
    return{
      status: StatusCode.BAD_REQUEST,
      message: "Contact is requrie"
    }
  }

  const regex = /^[6-9]\d{9}$/;
  if(!regex.test(contact)){
    return{
      status: StatusCode.BAD_REQUEST,
      message: "Contact must be 10 digit"
    }
  }
  return regex.test(contact);
};

export const validateEmailOrContact = (emailOrContact) => {
  if(!emailOrContact){
    return{
      status: StatusCode.BAD_REQUEST,
      message: "Email Or Contact is requrie"
    }
  }

  const emailRegex = (/^[^\s@]+@[^\s@]+\.[^\s@]+$/) || ( /^\d+$/);
  if(!emailRegex.test(emailOrContact)){
    return{
      status: StatusCode.BAD_REQUEST,
      message: "If you use email enter valid email, If you use contact enter valid contact."
    }
  }
  emailRegex.test(emailOrContact);
};

export const validTitle = (title) =>{
  if(!title){
    return{
      status: StatusCode.BAD_REQUEST,
      message:"Title is requrie"
    }
  }
  return true
}

export const validDescription = (description) =>{
  if(!description){
    return{
      status: StatusCode.BAD_REQUEST,
      message:"Description is requrie"
    }
  }
  return true
}