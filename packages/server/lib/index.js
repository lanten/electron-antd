'use strict';

var _domainSpaces = require('./services/domainSpaces');

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');


var app = express();

// cors & body parser middleware should come before any routes are handled
// app.use(cors({exposedHeaders: ['Total-Count', 'Report-Total']}));
app.use(bodyParser.json({ limit: '2mb' }));
app.use(bodyParser.urlencoded({ limit: '2mb', extended: false }));

// Routes
// Note: If routes share a base path, i.e. /contracts, any middleware applied to /contracts route
// will also run for nested routes, i.e. proposals and reports. So they don't need to be repeated
// otherwise they will run twice.
// put your routes here
app.get('/domain-space', async function (req, res) {
  try {
    console.log(req.body.url);
    var space = await (0, _domainSpaces.getDomainSpace)(req.body.url);
    var provider = await (0, _domainSpaces.get3BoxWalletProvider)();
    console.log(space._name);
    return res.status(200).send({
      name: space._name,
      ethereumAddress: provider.address
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ error: error });
  }
});

app.listen(2000, function () {
  console.log('App listening at http://localhost:%s', 2000);
});

module.exports = app;

/**
//  * Bootstrap the application. Start express.
//  */

// const port = process.env.PORT || 2000;
// app.listen(port, () => {
//   console.log('App listening at http://localhost:%s', port);
// });

// const main = async () => {
//   try {
//     const port = process.env.PORT || 2000;
//     app.listen(port, () => {
//       console.log('App listening at http://localhost:%s', port);
//     });
//   } catch (err) {
//     console.error(err);
//     process.exit(1);
//   }
// };

// main();