const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors');
var dotenv = require('dotenv');
var path = require('path');

dotenv.config();
// Import routers
const userRoutes = require('./routes/userRoutes');
const courseRoutes = require('./routes/courseRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
const upload = multer();
app.use(cors());

// Routes
app.use(express.static(path.join(__dirname, 'public')));
app.use('/users', userRoutes);
app.use('/courses', courseRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
      res.status(400).json({ success: false, error: err.message });
  } else {
      console.error(err.stack);
      res.status(500).send('Something broke!');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});