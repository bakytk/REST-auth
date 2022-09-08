
const {
  SERVER_PORT,
} = process.env;

import express from 'express';
const app = express();

import bodyParser from 'body-parser';
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

import cors from 'cors';
app.use(cors())

import rateLimit from "express-rate-limit";
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100 });
app.use(limiter);

//const routes = require ('./src/routes');
//routes(app);

app.use((err, request, response, next) => {
  console.error(err);
  const status = err.status || 500;
  response.status(status);
  response.render('Error');
});

app.listen(SERVER_PORT,function(){
  console.log("Server started.");
});
