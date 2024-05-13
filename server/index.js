// server/index.js

const path = require("path");
const express = require("express");
const app = express();

// Configurar Express para servir archivos estáticos desde la carpeta 'client/build'
app.use(express.static(path.join(__dirname, "../pwa-transporte/build")));

const transportRoutes = require("./data/TransportRoutes.jsx");

const PORT = process.env.PORT || 3001;

app.get("/api", (req, res) => {
  res.json({ message: "Hola desde el servidor!" });
});

// Se obtiene la lista de rutas
app.get("/api/routes", (req, res) => {
  res.json(transportRoutes);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
