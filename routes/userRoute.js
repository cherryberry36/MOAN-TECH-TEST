const express = require("express");
const userRoute = express.Router();
const { signUp, login } = require("../controller/userController.js");

userRoute.post("/", signUp);
userRoute.post("/login", login);

module.exports = userRoute;
