const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const database = require('./db/database');

// MongoDB connection
mongoose.Promise = global.Promise;
mongoose.connect(database.db, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
    console.log('Database connected ')
  },
  error => {
    console.log('Database not connected : ' + error)
  }
)

const userRoute = require('./routes/user.route')
const medicsRoute = require('./routes/medics.route')

const app = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cors());

app.use('/api/user/', userRoute);
app.use('/api/medics/', medicsRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log('PORT connected: ' + port)
})
