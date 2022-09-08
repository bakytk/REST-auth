
// const JWT_SECRET = process.env.JWT_SECRET;
// if (!JWT_SECRET) {
//   throw new Error("Missing JWT_SECRET env");
// };
//const generateToken = authSign(JWT_SECRET);
//import { authSign, AuthError } from "./auth";

// import DB from "../db";
// const db = new DB()
// db.connect()

import { db } from "../models/db.js";
db.sequelize.sync({ force: true });

//const {uuid} = require('uuidv4');

const obj = {

  ping: (req, res) => {
    return res.status(200).json({message: "Pong!"});
  },

  // shipnewProduct: async (req, res) => {

  //   try {
  //     //most fields randomized, except 'company'
  //     //which should be passed explicitly in POST body
  //     let container_id = uuid()
  //     let date = new Date()
  //     let company = req.body.company
  //     let data= {
  //       company: company,
  //       user_id: uuid(),
  //       created_at: date.getTime(),
  //       updated_at: date.getTime(),
  //       name: '',
  //       user_estimated_unit_width: Math.random()*10,
  //       user_estimated_unit_height: Math.random()*10,
  //       user_estimated_unit_depth: Math.random()*10,
  //       unit_depth: 'm',
  //       unit_width: 'm',
  //       unit_height: 'm',
  //       unit_weight: 'kg',
  //       description: '',
  //       category_id: 'retail',
  //       product_images: {
  //         storage_key: uuid(),
  //       },
  //       status: 'Accepted to storage'
  //     }
  //     await RedisInstance.shipProduct(container_id, data)
  //     res.json({message: `You can track product by ID: ${container_id}`})
  //   } catch(e) {
  //     console.error(e) // => logger
  //     res.json({message: `POST request unsucessful.`})
  //   }
  // },

  // getProducts: async (req, res) => {
  //   let company = req.body.company
  //   try {
  //     let data = await RedisInstance.getProducts(company)
  //     res.json({message: `Information by company`, data: data})
  //   }
  //   catch(e){
  //     console.error(e) // => logger
  //     res.json({message: `GET request unsucessful.`})
  //   }
  // },

  // getProductWithID: async (req, res) => {
  //   let container = req.body.product_id
  //   try {
  //     let data = await RedisInstance.getProduct(container)
  //     res.json({message: `Information by product`, data: data})
  //   }
  //   catch(e){
  //     console.error(e) // => logger
  //     res.json({message: `GET request unsucessful.`})
  //   }
  // },

  // updateProduct: async (req, res) => {
  //   try {
  //     //expect to change only company, other fields ignored
  //     let container = req.body.product_id
  //     let company = req.body.company
  //     if (!company || company.length === 0 ) {
  //       res.json({message: `Company name is required. Pls provide full data.`})
  //     } else {
  //       await RedisInstance.updateProduct(container, company)
  //       res.json({message: `Product's company field is updated.`})
  //     }
  //   }
  //   catch(e){
  //     console.error(e) // => logger
  //     res.json({message: `PUT request unsucessful.`})
  //   }
  // },

  // deleteProduct: async (req, res) => {
  //   try {
  //     let container = req.body.product_id
  //     await RedisInstance.deleteProduct(container)
  //     res.json({message: `Product deleted.`})
  //   }
  //   catch(e){
  //     console.error(e) // => logger
  //     res.json({message: `DELETE request unsucessful.`})
  //   }
  // }
}

export const { ping } = obj;
