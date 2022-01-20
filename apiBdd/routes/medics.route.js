const express = require('express');
const app = express();
const medicsRoute = express.Router();
let MedicsModel = require('../model/medics');

medicsRoute.route('/checkCode').post((req, res) => {
  MedicsModel.find({medical_id: req.body.medical_idData}, (error, result) => {
    if (result.length === 0) {
      res.json({status: 202, message: 'Ce médical id ne correspond à aucun médecin'});
    } else {
      if (result[0].name === req.body.nameData && result[0].surname === req.body.surnameData) {
        res.json({status: 200, message: 'Le médical id est correct'});
      } else {
        res.json({status: 201, message: 'Ce médical id ne correspond pas au nom et au prénom rentré'});
      }
    }
  });
});
module.exports = medicsRoute;
