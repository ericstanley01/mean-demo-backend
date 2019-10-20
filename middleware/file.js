const multer = require('multer');
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const dotenv = require('dotenv');
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

var storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'mean-demo', // cloudinary folder where you want to store images, empty is root
  allowedFormats: ['jpg', 'png'],
});

// const MIME_TYPE_MAP = {
//   'image/png': 'png',
//   'image/jpg': 'jpg',
//   'image/jpeg': 'jpg'
// };

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const isValid = MIME_TYPE_MAP[file.mimetype];
//     let error = new Error('Invalid mime type');
//     if (isValid) {
//       error = null;
//     }
//     cb(error, "images");
//   },
//   filename: (req, file, cb) => {
//     const name = file.originalname.toLowerCase().split(' ').join('-');
//     const ext = MIME_TYPE_MAP[file.mimetype];
//     cb(null, name + '-' + Date.now() + '.' + ext);
//   }
// });

module.exports = multer({
  storage: storage
}).single('image');
