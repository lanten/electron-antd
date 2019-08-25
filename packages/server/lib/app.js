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
    console.log(req.body);
    var space = await (0, _domainSpaces.getDomainSpace)(req.body.url);
    console.log(space);
    return res.status(200).send('space');
  } catch (error) {
    return res.status(500).send({ error: error });
  }
});

app.listen(2000, function () {
  console.log('App listening at http://localhost:%s', port);
});

module.exports = app;