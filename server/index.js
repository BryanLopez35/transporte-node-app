// server/index.js

const express = require("express");

const app = express();

app.get("/api", (req, res) => {
  res.json({ message: "Hola desde el servidor!" });
});
