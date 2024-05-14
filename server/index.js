// server/index.js

const path = require("path");
const express = require("express");
const app = express();




// Configurar Express para servir archivos estáticos desde la carpeta 'client/build'
app.use(express.static(path.join(__dirname, "../pwa-transporte/build")));

app.use(function (req, res, next) {
  // res.header("Access-Control-Allow-Origin", "*");
  const allowedOrigins = ['http://localhost:3000', 'https://transporte-tijuana.netlify.app', 'http://transporte-tijuana.netlify.app'];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-credentials", true);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE");
  next();
});

const transportRoutes = require("./data/TransportRoutes.jsx");

const PORT = process.env.PORT || 3001;

app.get("/api", (req, res) => {
  res.json({ message: "Hola desde el servidor!" });
});

// Se obtiene la lista de rutas
app.get("/api/routes", (req, res) => {
  res.json(transportRoutes);
});

app.get("/api/routes/:routeId", (req, res) => {
  const routeId = req.params.routeId;
  const route = transportRoutes.find(route => route.routeNumber === parseInt(routeId));
  if (!route) {
    res.status(404).json({ error: "Ruta no encontrada" });
  } else {
    res.json(route);
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
