const multer = require("multer");
const path = require("node:path");


const storageConfig = multer.diskStorage({
    destination: path.join(__dirname, "../files/"),
    filename: (req, file, res) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      const extentionName = file.originalname.split('.').pop();
      res(null, uniqueSuffix + "." + extentionName);
    },
  });
  
  // file filter for filtering only images
  const fileFilterConfig = function(req, file, cb) {
    if (file.mimetype === "application/pdf") {
        cb(null, true);
    } else {
      cb(null, false);
      throw Error("Only pdf file is allowed!");
    }
  };
  
  
  module.exports.upload = multer({
    storage: storageConfig,
    limits: { fileSize: 1024 * 1024 * 10 },
    fileFilter: fileFilterConfig,
  });