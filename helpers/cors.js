const cors = require('cors');

const express = require('express');

const app = express();

const whitelist = [
  'http://localhost:3000',
  'http://localhost:8080',
];

const corsOptionsDelegate = function (req, callback) {
  let corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};

module.exports = { corsOptionsDelegate, cors };

// app.get('/products/:id', cors(corsOptionsDelegate), (req, res, next) => {
//   res.json({ msg: 'This is CORS-enabled for a whitelisted domain.' });
// });

// app.listen(80, () => {
//   console.log('CORS-enabled web server listening on port 80');
// });
