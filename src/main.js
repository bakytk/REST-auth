
import dotenv from 'dotenv' 
dotenv.config()

const {
  SERVER_PORT,
} = process.env;

import express from 'express';
const app = express();

import rateLimit from "express-rate-limit";
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100 });
app.use(limiter);

import {router} from './routes/index.js';
app.use('/', router);

app.listen(SERVER_PORT,function(){
  console.log("Server started.");
});
