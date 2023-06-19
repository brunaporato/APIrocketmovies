const { Router } = require("express");
const MovieNotesController = require("../controllers/MovieNotesController");
const movieNotesRoutes = Router();

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const movieNotesController = new MovieNotesController();

movieNotesRoutes.use(ensureAuthenticated);

movieNotesRoutes.post("/", movieNotesController.create);
movieNotesRoutes.delete("/:id", movieNotesController.delete);
movieNotesRoutes.get("/:id", movieNotesController.show);
movieNotesRoutes.get("/", movieNotesController.index);

module.exports = movieNotesRoutes;