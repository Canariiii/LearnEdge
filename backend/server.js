const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const Multer = require('multer');

// Import routers
const userRouter = require('./routes/userRoutes');
const studentRouter = require('./routes/studentRoutes');
const courseRoutes = require('./routes/courseRoutes');


const app = express();
const PORT = process.env.PORT || 3001;

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '/')));
app.use('/user-images', express.static(path.join(__dirname, 'public/images')));

// Routes
app.use('/users', userRouter);
app.use('/students', studentRouter);
app.use('/courses', courseRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  if (err instanceof Multer.MulterError) {
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