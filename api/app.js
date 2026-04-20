const express = require("express");
const cors = require("cors");
const app = express();

const leadRoutes = require("./routes/leadRoutes");
const noteRoutes = require("./routes/noteRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api", leadRoutes);
app.use("/api", noteRoutes);
app.use("/api", dashboardRoutes);

// test route (IMPORTANT for debugging)
app.get("/", (req, res) => {
    res.send("API running");
});

module.exports = app;