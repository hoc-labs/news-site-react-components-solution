const mongoose = require('mongoose');
const { mongoURI } = require('./config');

async function connectDB() {
  const connectionOptions = { useNewUrlParser: true, useUnifiedTopology: true}
  mongoose.connect(mongoURI, connectionOptions);

  const db = mongoose.connection;
  db.on('error', (error)=>console.log(error));
  db.once('open', ()=> console.log('connected to database'));
};

module.exports = connectDB;
