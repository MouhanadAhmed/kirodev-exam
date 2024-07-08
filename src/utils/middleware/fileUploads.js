
import multer from "multer";
import AppError from "../services/AppError.js"
import fs from 'fs';
/**
 * This is Options for the multer file upload
 * ```
 * - Accept folderName as param and creates the folder if not existing 
 * - Create unique name for the uploaded files
 * - Validates the uploaded files to be of type image only
 * ```
* @param {*} folderName The folderName to save the uploaded images at.
*/
let options = (folderName) => {
  const storage = multer.diskStorage({
    // destination to store the uploaded image 
    destination: function (req, file, cb) {

    // Create folder if it does not exist
    if (!fs.existsSync(`uploads/${folderName}`)) {
      fs.mkdirSync(`uploads/${folderName}`);
    }

      cb(null, `uploads/${folderName}`);
    },
    // Generates name for the uploaded file with a unique name 
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + "-" + file.originalname);
    },
  });
  // Filters the uplaoded file to make sure it is image only
  function fileFilter(req, file, cb) {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new AppError("invalid image", 400), false);
    }
  }

  return multer({ storage, fileFilter });

};

/**
 * This is Upload single file using multer 
 * ```
 * - Accept folderName as param and sent it to the options function 
 * ```
* @param {*} folderName The folderName to save the uploaded images at.
* @param {*} fieldName The field name (Key name) associated with the file upload (as value) .
*/
export const uploadSingleFile = (folderName, fieldName) =>  options(folderName).single(fieldName);
