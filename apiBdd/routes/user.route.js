const express = require('express');
const app = express();
const userRoute = express.Router();
let UserModel = require('../model/User');


userRoute.route('/').get((req, res) => {
  UserModel.find({name: "Barrat"}, (err, result) => {
    res.json(result);
  });
});

userRoute.route('/get/infosQr').post((req, res) => {
  console.log('infosQr', req.body);
  UserModel.find({token: req.body.data}, (err, result) => {
    result[0]['psw'] = undefined;
    result[0]['medical_id'] = undefined;
    result[0]['mail'] = undefined;
    result[0]['category'] = undefined;
    res.json(result[0]);
  });
});

userRoute.route('/get/infos').post((req, res) => {
  console.log('infos', req.body);
  UserModel.find({token: req.body.data}, (err, result) => {
    result[0]['psw'] = undefined;
    res.json(result[0]);
  });
});

//Ajout d'une dose de vaccin
userRoute.route('/addVacine').post((req, res, next) => {
  UserModel.find({token: req}, (err, result) => {
    //const doc = { name: "Neapolitan pizza", shape: "round" };
    //const result = await collection.insertOne(doc);
    //console.log(`A was inserted with the _id: ${result.insertedId}`,
    //);
    console.log("addVaccine");
  });
});

userRoute.route('/create-user').post((req, res, next) => {
  console.log(req,res);
  UserModel.create(req.body, (err, user) => {
    console.log(err);
    console.log(user);
  })
});


userRoute.route('/fetch-user/:id').get((req, res) => {
  UserModel.findById(req.params.id, (err, user) => {
    if (err) {
      return next(err)
    } else {
      res.json(user)
      console.log('User retrieved!')
    }
  })
})


userRoute.route('/update-user/:id').put((req, res, next) => {
  UserModel.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (err, user) => {
    if (err) {
      return next(err);
    } else {
      res.json(user)
      console.log('User updated!')
    }
  })
})

userRoute.route('/delete-user/:id').delete((req, res, next) => {
  UserModel.findByIdAndRemove(req.params.id, (error, user) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: user
      })
      console.log('User deleted!')
    }
  })
})

module.exports = userRoute;
