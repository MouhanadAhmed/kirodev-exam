import multer from "multer";
import AppError from "../services/AppError.js";
import fs from 'fs';
import path from 'path';

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
      const uploadPath = path.join(__dirname, 'uploads', folderName);

      console.log(`Attempting to create directory at: ${uploadPath}`);

      // Create folder if it does not exist
      if (!fs.existsSync(uploadPath)) {
        try {
          fs.mkdirSync(uploadPath, { recursive: true });
          console.log(`Directory created at: ${uploadPath}`);
        } catch (error) {
          console.error(`Error creating directory: ${error.message}`);
          cb(new AppError("Failed to create directory", 500), false);
          return;
        }
      }

      cb(null, uploadPath);
    },
    // Generates name for the uploaded file with a unique name 
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + "-" + file.originalname);
    },
  });

  // Filters the uploaded file to make sure it is image only
  function fileFilter(req, file, cb) {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new AppError("Invalid image type", 400), false);
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
export const uploadSingleFile = (folderName, fieldName) => options(folderName).single(fieldName);
