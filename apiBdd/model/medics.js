const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Medics = new Schema({
  id: Object,
  medical_id: Number,
  name: String,
  surname: String
}, {
  collection: 'medics'
})

module.exports = mongoose.model('Medics', Medics);
