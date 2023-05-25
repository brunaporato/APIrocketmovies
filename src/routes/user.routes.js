const { Router } = require("express");
const UserController = require("../controllers/UserController");
const MovieNotesController = require("../controllers/MovieNotesController");
const userRoutes = Router();

const userController = new UserController();

userRoutes.post("/", userController.create);
userRoutes.put("/:id", userController.update);

module.exports = userRoutes;