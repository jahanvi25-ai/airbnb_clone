const path = require("path");
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const homeRoutes = require("./routes/homeRoutes");
const favouriteRoutes = require("./routes/favouriteRoutes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// This is the actual "connection" between the two separately-running
// servers: only requests from CLIENT_URL are allowed through.
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
  })
);

// Uploaded home photos, served as plain static files.
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

app.use("/api/auth", authRoutes);
app.use("/api/homes", homeRoutes);
app.use("/api/favourites", favouriteRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || "Server error" });
});

module.exports = app;
