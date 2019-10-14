const express = require('express')
const app = express()
// const MongoClient = require('mongodb').MongoClient
const bodyParser = require('body-parser')

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH");
  next();
});

app.use(bodyParser.json())
app.use('/img', express.static('tmp/my-uploads'))

//controllers
const shoes = require('./controllers/shoes')
// const admins = require('./controllers/shoes.js/index.js')

app.use('/shoes', shoes)
// app.use('/admin', admins)

app.listen(3000, function () {
  console.log('Run in Port 3000')
})