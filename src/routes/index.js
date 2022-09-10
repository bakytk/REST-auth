
//import { authVerify } from "./auth";
//const confirmToken = authVerify(JWT_SECRET);

//const generateToken = authSign(JWT_SECRET);
//import { authSign, AuthError } from "./auth";

import {
  ping,
  signup,
  signin,
  newToken,
  fallback
} from '../controllers/index.js';
import { file_router } from '../controllers/files/index.js';

import cors from 'cors';
import bodyParser from 'body-parser';
import express from 'express';
const router = express.Router();

//can restrict for specific IP's with options
router.use(cors())
router.use("/*", bodyParser.json());
router.use("/file", file_router);

router.get("/alive", ping);
router.post("/signup", signup);
router.post("/signin", signin);
router.post("/signin/new_token", newToken);
router.all("/*", fallback);
router.use((error, _, res, __) => {
  console.error(`Processing err: ${error}`);
  return res.status(500).json({ error: "Processing error" });
});
      

export {router};
