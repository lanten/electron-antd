const express = require('express');
const domainSpaces = require('./domainSpaces');

const router = express.Router();
router.use('/domain-space', domainSpaces);

module.exports = router;
