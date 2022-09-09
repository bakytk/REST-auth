
// const JWT_SECRET  = process.env.JWT_SECRET;
// if (!JWT_SECRET) {
//   throw new Error("Missing JWT_SECRET env");
// };

//import { authVerify } from "./auth";
//const confirmToken = authVerify(JWT_SECRET);

import {
  ping,
  signup
  // shipnewProduct,
  // getProducts,
  // getProductWithID,
  // updateProduct,
  // deleteProduct
} from '../controllers/index.js';

import cors from 'cors';
import bodyParser from 'body-parser';
import express from 'express';
const router = express.Router();

//can restrict for specific IP's with options
router.use(cors())
//router.use(bodyParser.urlencoded({ extended: true }));
//router.use(bodyParser.json());


// router.post("/auth", authenticate);
router.get("/alive", ping);
router.post("/signup", bodyParser.json(), signup);
// router.get("/movies", confirmToken, fetch);
// router.post("/movies", confirmToken, create);
// router.all("/*", fallback);
router.use((error, _, res, __) => {
  console.error(`Processing err: ${error}`);
  return res.status(500).json({ error: "Processing error" });
});
      

export {router};
