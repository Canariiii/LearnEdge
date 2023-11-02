const { MongoClient } = require('mongodb');
const express = require('express');
const app = express();
const port = 3000;

const uri = 'mongodb://localhost:27017/LearnEdgeDB';

const client = new MongoClient(uri, { useUnifiedTopology: true });

client.connect((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err);
    return;
  }
  console.log('Conexión exitosa a la base de datos');

  app.listen(port, () => {
    console.log(`Servidor iniciado en el puerto ${port}`);
  });
});

