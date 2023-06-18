const { Router } = require("express");

const userRoutes = require("./user.routes");
const movieNotesRoutes = require("./movieNotes.routes");
const tagsRoutes = require("./tags.routes");
const sessionsRoutes = require("./sessions.routes");

const routes = Router();

routes.use("/users", userRoutes);
routes.use("/movienotes", movieNotesRoutes);
routes.use("/tags", tagsRoutes);
routes.use("/sessions", sessionsRoutes);

module.exports = routes;