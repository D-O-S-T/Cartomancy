const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const swaggerSetup = require('./config/swagger');
const trilhaRoutes = require('./routes/trilhaRoutes');

const app = express();

// ⬇️ middlewares primeiro
app.use(cors());
app.use(express.json());

// ⬇️ depois, as rotas
app.use('/api/trilhas', trilhaRoutes);
app.use('/api/usuarios', userRoutes);

// Swagger
swaggerSetup(app);

module.exports = app;
