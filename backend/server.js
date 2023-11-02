const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const courseRoutes = require('./routes/courseRoutes');
// ... otros imports ...

const app = express();

// Configurar la conexión a la base de datos
mongoose.connect('mongodb://localhost:27017/LearnEdgeDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Configurar el middleware
app.use(express.json());
// ... otra configuración de middleware ...

// Configurar las rutas
app.use('/users', userRoutes);
// ... otras rutas ...

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});
