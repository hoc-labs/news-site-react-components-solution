const express = require('express');
const connectDB = require('./db');
const cors = require('cors');
const {port} = require('./config');

require('./models/User');
require('./models/Article');
require('./models/Comment');
require('./models/Topic');

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));
app.use(express.json());

connectDB();

app.use('/api/users', require('./routes/api/users'));
app.use('/api/articles', require('./routes/api/articles'));
app.use('/api/topics', require('./routes/api/topics'));

app.listen(port, ()=> {
  console.log(`Server started on port ${port}`);
});

