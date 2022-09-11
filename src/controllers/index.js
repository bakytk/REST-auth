
const { JWT_SECRET } = process.env;

import jwt from 'jsonwebtoken';
import { signin, signup, newToken } from "./signin.js";

const obj = {

  ping: (req, res) => {
    return res.status(200).json({message: "Pong!"});
  },

  info: (req, res) => {
    let { id } = req.decode;
    return res.json({
      id: id
    });
  },

  logout: (req, res) => {
    let { id } = req.decode;
    let data ={
      id: id
    }
    let token = jwt.sign(data, JWT_SECRET, { expiresIn: '10m'});
    res.json({
      message: "Logout successful!",
      access_token: token,
    });
  },
  
  fallback: (req, res) => {
    return res.status(401).json({message: "Invalid endpoint or method"})
  },

}

export const { ping, fallback, info, logout } = obj;
export { signup, signin, newToken };