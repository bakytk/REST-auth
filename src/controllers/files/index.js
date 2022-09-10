
import {
  upload,
  download,
  get,
  remove,
  update,
  list
} from './subcontrollers.js';

import express from 'express';
const file_router = express.Router();

import multer from 'multer';
//mkdir -p /var/temp/uploads
const download_path = '/var/temp/uploads/'
const upload_file = multer({ dest: download_path })

//const generateToken = authSign(JWT_SECRET);
//import { authSign, AuthError } from "./auth";

file_router.post("/upload", upload_file.single('sample'), upload);
file_router.put("/update/:id", upload_file.single('sample'), update);
file_router.post("/download/:id", download);
file_router.get("/single/:id", get);
file_router.delete("/delete/:id", remove);
file_router.get("/list", list);

export {file_router};
