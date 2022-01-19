const express = require('express');
const app = express();
const userRoute = express.Router();
let UserModel = require('../model/User');

function generate_token(length) {
  //edit the token allowed characters
  let a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
  let b = [];
  for (var i = 0; i < length; i++) {
    var j = (Math.random() * (a.length - 1)).toFixed(0);
    b[i] = a[parseInt(j)];
  }
  return b.join("");
}

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
  UserModel.find({token: req.body.data}, (err, result) => {
    if (result.length !== 0) {
      result[0]['psw'] = undefined;
      res.json(result[0]);
    }
  });
});

userRoute.route('/login').post((req, res) => {
  UserModel.find({mail: req.body.mail}, (err, result) => {
    if (result.length !== 0) {
      if (result[0]['psw'] === req.body.password) {
        // mot de passe correct, retourne les données utilisateurs
        result[0]['psw'] = undefined;
        res.status(200).json(result[0]);
      } else {
        // mot de passe non correct
        res.status(201).send('Mot de passe incorrect');
      }
    } else {
      // mail n'existe pas
      res.status(202).send('Mail invalide');
    }
  });
});

//Ajout d'une dose de vaccin
userRoute.route('/add/vaccine').post((req, res, next) => {
  console.log('addVacinne received', req.body);
  UserModel.find({mail: req.body.mail}, (err, resultV) => {
    console.log(resultV);
    if (resultV) {
      console.log('User ' + req.body.mail + ' found.')
      UserModel.create(req.body.body, (err, user) => {
        console.log(user);
        console.log("Vaccine added");
      });
    }
    else {
      console.log("User not found");
      alert("ERREUR");
    }



  });
});

function checkToken(token) {
  UserModel.find({token: token}, (err, result) => {
    if (result.length<1) {
      return token;
    } else {
      token = generate_token(256);
      checkToken(token);
    }
  });
}

userRoute.route('/create-user').post((req, res, next) => {
  UserModel.find({mail: req.body.mail}, (err, result) => {
    console.log(result);
    if (result.length<1) {
      req.body.token = generate_token(256);
      checkToken(req.body.token);
      UserModel.create(req.body, (err, user) => {
        res.send(user);
      });
    }else{
      res.send(JSON.stringify('Email déjà utilisée : '+ req.body.mail));
    }
  });
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
