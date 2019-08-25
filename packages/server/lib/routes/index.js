'use strict';

var express = require('express');
var domainSpaces = require('./domainSpaces');

var router = express.Router();
router.use('/domain-space', domainSpaces);

module.exports = router;