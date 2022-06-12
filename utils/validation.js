const validator = require("validator");
const isEmpty = require("./is-empty.js");

const validateSignupInput = (data) => {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!validator.isLength(data.name, { min: 2, max: 50 })) {
    errors.name = "Name must be between 2 and 50 characters";
  }

  if (validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  if (validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  if (!validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (!validator.isLength(data.password, { min: 6, max: 20 })) {
    errors.password = "Password must be at least 6 characters";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

const validateLoginInput = (data) => {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  if (!validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

const validatePostInput = (data) => {
  let errors = {};

  data.topic = !isEmpty(data.topic) ? data.topic : "";
  data.question = !isEmpty(data.question) ? data.question : "";

  if (validator.isEmpty(data.topic)) {
    errors.topic = "Please include a question topic";
  }

  if (!validator.isLength(data.topic, { min: 10 })) {
    errors.topic = "Question topic must be more than 10 characters";
  }
  if (validator.isEmpty(data.question)) {
    errors.question = "Please include a question topic";
  }

  if (!validator.isLength(data.question, { min: 50 })) {
    errors.question = "Question must be more than 50 characters";
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = { validateSignupInput, validateLoginInput, validatePostInput };
