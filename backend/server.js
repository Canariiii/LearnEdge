var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var dotenv = require('dotenv');
var path = require('path');

dotenv.config();

var userRouter = require('./routes/user');

var app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

mongoose.connect(process.env.MONGODB_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

var port = process.env.PORT || 3000;

var router = express.Router();

router.use('/users', userRouter);

app.use('/api', router);

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port);
console.log('Listening on http://localhost: ' + port);