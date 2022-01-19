const express = require('express');
const app = express();
const medicsRoute = express.Router();
let MedicsModel = require('../model/medics');

medicsRoute.route('/check').post((req, res) => {
  console.log(req.body);
});

module.exports = medicsRoute;
