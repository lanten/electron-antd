'use strict';

var express = require('express');

var _require = require('../services/domainSpaces'),
    getDomainSpace = _require.getDomainSpace;

var router = express.Router();

router.get('/', async function (req, res) {
  try {
    var space = await getDomainSpace(url);
    return res.status(200).send(space);
  } catch (error) {
    return res.status(500).send({ error: error });
  }
});

module.exports = router;