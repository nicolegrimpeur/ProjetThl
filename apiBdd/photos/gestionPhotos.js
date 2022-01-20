const util = require('util');
const multer = require('multer');
const maxSize = 2 * 1024 * 1024;

// const path = __dirname + '/../ressourcesModels/allRessources/';
const path = './stockagePhotos/';

////////// gestion de l'upload d'image
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path + "images/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single("file");

let uploadFileMiddleware = util.promisify(uploadFile);

// upload d'une image sur serveur
exports.uploadImage = async function (req, res) {
  try {
    await uploadFileMiddleware(req, res);

    if (req.file === undefined) {
      return res.status(400).send({ message: "Please upload a file!" });
    }

    res.status(200).send({
      message: "Uploaded the file successfully: " + req.file.originalname,
    });
  } catch (err) {
    console.log('erreur : ', err);

    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(500).send({
        message: "File size cannot be larger than 2MB!",
      });
    }

    res.status(500).send({
      message: `Could not upload the file: ${req.file.originalname}. ${err}`,
    });
  }
};

// download une image
exports.downloadImage = async function (req, res) {
  const fileName = req.params.name + '.jpeg';
  const directoryPath = path;

  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not download the file. " + err,
      });
    }
  });
};
