const express = require('express');
const { getDomainSpace} = require('../services/domainSpaces');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const space = await getDomainSpace(url);
    return res.status(200).send(space);
  } catch (error) {
    return res.status(500).send({error});
  }
});

module.exports = router;
