export const validatePassword = (password) => {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(password);
};

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validateContact = (contact) => {
  const regex = /^[6-9]\d{9}$/;
  return regex.test(contact);
};

export const validateEmailOrContact = (emailOrContact) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const contactRegex = /^\d+$/;
  return emailRegex.test(emailOrContact) || contactRegex.test(emailOrContact);
};
