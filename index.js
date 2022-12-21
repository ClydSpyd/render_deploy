const express = require('express');
const cookieParser = require('cookie-parser');
const connectDb = require('./config/db.js');
const cors = require('cors');
const path = require("path");
require('dotenv').config();

const app = express();

app.use(cookieParser());
app.use(cors());
app.options('*', cors());

connectDb();

app.use(express.json({ extended: false }));

// app.use('/client/assets/', express.static(__dirname, 'client', 'assets'));

app.use('/api/test', require('./routes/test'));
app.use('/api/user', require('./routes/user'));
app.use('/api/auth', require('./routes/auth'));

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`app listening on port ${PORT}`));

module.exports = app;