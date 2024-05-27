const express = require("express");
const bodyParser = require("body-parser");
const controllerUser = require("../controllers/userController");
const authMiddleware = require("../authMiddleware/usersAuthMiddleware");
const app = express.Router();

app.use(bodyParser.json());

app.get("/users", controllerUser.getAllUsers)

//POST; route pour INSCRIPTION
app.post("/register", controllerUser.register);


app.post("/login", controllerUser.login);
app.put("/updatePassword", authMiddleware, controllerUser.updatePassword);

module.exports = app;