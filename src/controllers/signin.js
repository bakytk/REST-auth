
const { JWT_SECRET } = process.env;

//const generateToken = authSign(JWT_SECRET);
//import { authSign, AuthError } from "./auth";

import { db } from "../db/index.js";
db.sequelize.sync({ force: true });

import jwt from 'jsonwebtoken';
import { uuid } from 'uuidv4';

const obj = {

  signup: async (req, res) => {
    try {
      let { id, password } = req.body;
      if ( !(id && password)) {
        res.status(401).json({
          message: "Id or password absent!"
        });
      };
      let refreshtoken = uuid();
      let result = await db.users.create({
        "id": id,
        "password": password,
        "refreshToken": refreshtoken
      });
      let data ={
        id: id
      }
      let token = jwt.sign(data, JWT_SECRET, { expiresIn: '10m'});
      res.json({
        message: "Successful registration!",
        access_token: token,
        refresh_token: refreshtoken
      });
    } catch(e){
      console.log("signup error", e);
      res.send("Processing error.");
    }
  },

  signin: async (req, res) => {
    try {
      let { id, password } = req.body;
      if ( !(id && password)) {
        res.status(401).json({
          message: "Id or password absent!"
        });
      };
      let result = await db.users.findAll({
        where: {
          "id": id
        }
      });
      //console.log("fetched user", result);
      let { password: db_password } = result[0].dataValues;
      if (db_password != password) {
        res.status(401).json({
          message: "Incorrect email or password!"
        });
      };
      let data ={
        id: id
      }
      let token = jwt.sign(data, JWT_SECRET, { expiresIn: '10m'});
      let refreshtoken = uuid();
      result = await db.users.update({ refreshToken: refreshtoken }, {
        where: {
          id: id
        }
      });
      //console.log("result", result); 
      // ==> 1
      res.json({
        message: "Successful authentication!",
        access_token: token,
        refresh_token: refreshtoken
      });
    } catch(e){
      console.log("signin error", e);
      res.send("Processing error.");
    }
  },

  newToken: async (req, res) => {
    try {
      let { refreshtoken } = req.body;
      if ( !refreshtoken ) {
        res.status(401).json({
          message: "Refreshtoken absent!"
        });
      };
      let result = await db.users.findAll({
        where: {
          "refreshtoken": refreshtoken
        }
      });
      //console.log("fetched user by refresh token", result);
      if ( ! (result.length > 0) ) {
        res.status(401).json({
          message: "Invalid token. Re-signin!"
        });
      };
      let { id } = result[0].dataValues;
      let token = jwt.sign({"id": id}, JWT_SECRET, { expiresIn: '10m'});
      res.json({
        message: "Successful token refresh!",
        access_token: token,
        refresh_token: refreshtoken
      });
    } catch(e){
      console.log("new token error", e);
      res.send("Processing error.");
    }
  },

}

export const { signup, signin, newToken } = obj;
