
import { signin, signup, newToken } from "./signin.js";

const obj = {

  ping: (req, res) => {
    return res.status(200).json({message: "Pong!"});
  },

  fallback: (req, res) => {
    return res.status(401).json({message: "Invalid endpoint or method"})
  }

}

export const { ping, fallback } = obj;
export { signup, signin, newToken };