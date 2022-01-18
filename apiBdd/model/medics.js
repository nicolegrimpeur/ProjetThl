const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Medics = new Schema({
  id: Object,
  medicalId: Number,
  name: String,
  surname: String
}, {
  collection: 'medics'
})

module.exports = mongoose.model('Medics', Medics);
