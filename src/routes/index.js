// Node Modules
const express = require('express');

const makeIndexRouter = () => {
  const indexRouter = new express.Router();
  return indexRouter;
};

module.exports = makeIndexRouter;
