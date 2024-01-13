const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file_url, cb) {
    cb(null, 'D:\\Sertifikasi_UC\\Sertifikasi-UC\\Back-End\\Assets'); 
  },
  filename: function (req, file_url, cb) {
    cb(null, file_url.originalname);
  },
});

const upload = multer({ storage: storage });
module.exports = upload;


