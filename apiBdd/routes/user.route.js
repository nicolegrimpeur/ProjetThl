const express = require('express');
const uuid = require('uuid');
const app = express();
const userRoute = express.Router();
let UserModel = require('../model/User');
const gestionPhotos = require('../photos/gestionPhotos')

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

userRoute.route('/get/infosQr').get((req, res) => {
  const tmpUuid = req.headers.authorization.slice(req.headers.authorization.indexOf(' ') + 1)
  UserModel.find({uuid: tmpUuid}, async (err, result) => {
    console.log(result);
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


      res.status(200).send(result[0]);
    } else {
      res.status(403).send({message: 'QrCode invalide'});
    }
  });
});

userRoute.route('/get/infos').get((req, res) => {
  console.log(req.headers);
  UserModel.find({token: req.headers.authorization.split(' ')[1]}, async (err, result) => {
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

      res.status(200).send(result[0]);
    } else {
      res.status(403).send({message: 'L\'utilisateur n\'existe pas'});
    }
  });
});

userRoute.route('/login').post((req, res) => {
  console.log(req.body);
  UserModel.find({mail: req.body.mail}, (err, result) => {
    if (result.length !== 0) {
      if (result[0]['psw'] === req.body.password) {
        // mot de passe correct, retourne les données utilisateurs
        result[0]['psw'] = undefined;
        res.status(200).send(result[0]);
      } else {
        // mot de passe non correct
        res.status(403).send({message: 'Mot de passe invalide'});
      }
    } else {
      // mail n'existe pas
      res.status(403).send({message: 'Ce mail n\'existe pas encore, merci de vous créer un compte'});
    }
  });
});

//Ajout d'une dose de vaccin
userRoute.route('/add/vaccine').post((req, res, next) => {
  console.log('addVacinne received ', req.body);
//req.body.mail = 'watteltheo@gmail.com'; //For debug purposes
  UserModel.find({mail: req.body.mail}, (err, result) => {
    console.log('result :: ', result);
    if (result.length > 0) {
      console.log('User ' + req.body.mail + ' found.')
      result[0].vaccine.push(req.body);
      UserModel.findOneAndUpdate({mail: req.body.mail}, {vaccine: result[0].vaccine}, {}, (err, result) => {
        console.log(result)
        if (result !== [])
          res.status(200).send({message:'Vaccine added successfully'});
        else {
          res.status(403).send({message:'Vaccine added failure'});
        }
      });
    } else {
      res.status(404).send({message:'User not found'});
    }
  });
});

//Ajout d'un résultat de test
userRoute.route('/add/test').post((req, res, next) => {
  console.log('addTest received ', req.body);
  UserModel.find({mail: req.body.mail}, (err, result) => {
    console.log('result :: ', result);
    if (result.length > 0) {
      console.log('User ' + req.body.mail + ' found.')
      result[0].tests_results.push(req.body);
      UserModel.findOneAndUpdate({mail: req.body.mail}, {tests_results: result[0].tests_results}, {}, (err, result) => {
        if (result !== [])
          res.status(200).send({message: 'Test added successfully'});
        else {
          res.status(403).send({message: 'Test added failure'});
        }
      });
    } else {
      res.status(404).send({message: 'User not found'});
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
  console.log('register: ', req.body);
  UserModel.find({mail: req.body.mail}, async (err, result) => {
    if (result.length < 1) {
      req.body.token = await checkToken(generate_token(256)).then(r => {
        return r;
      });
      await UserModel.create(req.body, (err, user) => {
        res.status(200).send({message: 'Utilisateur créé avec succès'});
      });
    } else {
      res.status(403).send({message:'Mail invalide'});
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

userRoute.route('/delete-user').post((req, res, next) => {
  UserModel.find({token: req.body.tokenData}, (error, result) => {
    if (result.length !== 0) {
      if (result[0].psw !== req.body.pswData) {
        res.status(403).send({message:'Mot de passe erroné'});
      } else {
        UserModel.findOneAndDelete({token: req.body.tokenData}, (error, result) => {
          console.log("RESULT DELETE :" + result);
          console.log('User deleted!')
          res.status(200).send({message:'utilisateur supprimé avec succès'});
        });
      }
    } else {
      res.status(403).send({message:'User already delete'});
    }
  });
})

userRoute.route('/deleteData').post((req, res) => {
  UserModel.find({token: req.body.token}, async (error, result) => {
    if (result.length !== 0) {
      if (result[0].psw !== req.body.password) {
        res.status(403).send({ message: 'Mot de passe erroné'});
      } else {
        UserModel.findOneAndUpdate({token: req.body.token}, {tests_results: []}, {}, (err, result) => {
        });
        result[0].tests_results = [];
        res.status(200).send({ message: result[0]});
      }
    } else {
      res.status(404).send({message: 'L\'utilisateur n\'existe pas'});
    }
  });
})


userRoute.route('/modif-psw').post((req, res) => {
  UserModel.find({token: req.body.tokenData}, (error, result) => {
    if (result.length !== 0) {
      if (result[0].psw !== req.body.pswData) {
        res.status(403).send({message:'Mot de passe erroné'});
      } else {
        UserModel.findOneAndUpdate({token: req.body.tokenData}, {psw: req.body.newPswData}, (err, result) => {
          if (result !== []) {
            res.status(200).send({message:'la modification de mot de passe a réussie'});
          } else {
            res.status(502).send({message:'la modification de mot de passe a échouée'});
          }
        })
      }
    }
  })
});

userRoute.post('/uploadImg', gestionPhotos.uploadImage);

userRoute.get('/getImg/:name', gestionPhotos.downloadImage);

module.exports = userRoute;
