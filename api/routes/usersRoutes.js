const express = require("express");
const bodyParser = require("body-parser");
const controllerUser = require("./usersController");
const authMiddleware = require("./usersAuthMiddleware");
const app = express.Router();

app.use(bodyParser.json());

app.post("/register", controllerUser.register);
app.post("/login", controllerUser.login);
app.put("/updatePassword", authMiddleware, controllerUser.updatePassword);

module.exports = app;
