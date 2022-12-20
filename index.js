const express = require('express');
const cookieParser = require('cookie-parser');
const connectDb = require('./config/DB.JS');
const cors = require('cors');
const path = require("path");

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

// app.get('/',(req,res) => res.send('HELLO WORLD'));
// app.use(express.static(path.join(__dirname, "./client/dist")));

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}
// app.get("*", function (_, res) {
//     res.sendFile(
//       path.join(__dirname, "./client/build/index.html"),
//       function (err) {
//         if (err) {
//           res.status(500).send(err);
//         }
//       }
//     );
//   });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`app listening on port ${PORT}`));

module.exports = app;