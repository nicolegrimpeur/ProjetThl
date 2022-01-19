const express = require('express');
const uuid = require('uuid');
const app = express();
const userRoute = express.Router();
let UserModel = require('../model/User');

function generate_token(length) {
  //edit the token allowed characters
  let a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
  let b = [];
  for (let i = 0; i < length; i++) {
    let j = (Math.random() * (a.length - 1)).toFixed(0);
    b[i] = a[parseInt(j)];
  }
  return b.join("");
}

async function getUuid(token) {
  if (token === undefined) token = uuid.v4();
  const result = await UserModel.find({uuid: token});
  if (result.length === 0) {
    return token;
  } else {
    token = uuid.v4();
    return getUuid(token);
  }
}

userRoute.route('/').get((req, res) => {
  UserModel.find({name: "Barrat"}, (err, result) => {
    res.json(result);
  });
});

userRoute.route('/get/infosQr').post((req, res) => {
  console.log('infosQr', req.body);
  UserModel.find({uuid: req.body.data}, async (err, result) => {
    if (result.length !== 0) {
      result[0]['psw'] = undefined;
      result[0]['medical_id'] = undefined;
      result[0]['mail'] = undefined;
      result[0]['category'] = undefined;
      result[0]['uuid'] = undefined;

      const tmp = await getUuid().then(res => {
        return res;
      });
      UserModel.findOneAndUpdate({token: result[0]['token']}, {uuid: tmp}, {}, (err, result) => {
      });
      result[0]['uuid'] = tmp;


      res.json(result[0]);
    } else {
      res.status(201).json({message: 'QrCode invalide'});
    }
  });
});

userRoute.route('/get/infos').post((req, res) => {
  UserModel.find({token: req.body.data}, async (err, result) => {
    if (result.length !== 0) {
      result[0]['psw'] = undefined;

      // si l'uuid n'existe pas on le génère
      if (result[0]['uuid'] === undefined) {
        const tmp = await getUuid().then(res => {
          return res;
        });
        UserModel.findOneAndUpdate({token: req.body.data}, {uuid: tmp}, {}, (err, result) => {
        });
        result[0]['uuid'] = tmp;
      }

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
  console.log('addVacinne received for ', req.body);
//req.body.mail = 'watteltheo@gmail.com'; //For debug purposes
  UserModel.find({mail: req.body.mail}, (err, resultV) => {
    console.log('resultV', resultV);
    if (resultV != 1) {
      console.log('User ' + req.body.mail + ' found.')
      /*UserModel.create(req.body.body, (err, user) => {
        //.log(user);
        console.log("Vaccine added");
      });*/
      UserModel.findOneAndUpdate({mail: req.body.mail}, {vaccine: req.body.lab}, {}, (err, result) => {
      });
      console.log("Vaccine added");
    } else {
      console.log("User not found");
    }
  });
});

async function checkToken(token) {

  const result = await UserModel.find({token: token});
    if (result.length === 0) {
      return token;
    } else {
      token = generate_token(256)
      return checkToken(token);
    }
}

userRoute.route('/create-user').post((req, res, next) => {
  UserModel.find({mail: req.body.mail}, async(err, result) => {
    console.log("RESULT CREATE :" + result);
    if (result.length < 1) {
      req.body.token = await checkToken(generate_token(256)).then(r => {
        return r;
      });
      UserModel.create(req.body, (err, user) => {
        res.send(user);
      });
    } else {
      res.status(202).send('Mail invalide');
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

userRoute.route('/delete-user/:tokenData').post((req, res, next) => {
  UserModel.find({token: req.body.tokenData}, (error, result) => {
    console.log(result)
    if (result.length != 0) {
      if (result[0].psw !== req.body.pswData) {
        res.status(406).send(new Error('Mot de passe erroné'));
      } else {
        UserModel.findOneAndDelete({token: req.body.tokenData}, (error, result) => {
          console.log("RESULT DELETE :" + result);
          console.log('User deleted!')
          res.status(200).send(JSON.stringify('utilisateur supprimé avec succès'));
        });
      }
    } else {
      res.status(403).send('User already delete');
    }
  });
})

module.exports = userRoute;
