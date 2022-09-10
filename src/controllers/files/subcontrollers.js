
import { db } from "../../db/index.js";
db.sequelize.sync({ force: true });

import { promises as fs } from 'fs';
const download_path = '/var/temp/uploads/'

const functions = {

  upload: async (req, res) => {
    try {
      let { originalname: _name, mimetype, path, size }  = req.file;
      let extension = _name.split(".")[1];
      let content = await fs.readFile(path);
      await fs.rename(path, download_path + _name);
      console.log(_name, mimetype, size);
      let result = await db.files.create({
        name: _name,
        extension: extension,
        mime_type: mimetype,
        size: size,
        content: content
      });
      //console.log("result", result);
      res.send("File uploaded!")
    } catch(e){
      console.log("upload error", e);
      res.send("Processing error.");
    }
  },

  download: async (req, res) => {
    try {
      let { id }  = req.params;
      console.log("id", id);
      let result = await db.files.findAll({
        where: {
          "id": Number(id)
        }
      });
      let { name: filename } = result[0].dataValues;
      // console.log("fetched file", name, fs_name, result);
      // let content = await fs.readFile(download_path + name, "utf-8");
      // console.log(content);
      res.sendFile(download_path + filename)
    } catch(e){
      console.log("upload error", e);
      res.send("Processing error.");
    }
  },
   
  get: async (req, res) => {
    try {
      let { id }  = req.params;
      console.log("id", id);
      let result = await db.files.findAll({
        where: {
          "id": Number(id)
        }
      });
      let { name, extension, size, mime_type } = result[0].dataValues;
      res.json({
        name: name,
        extension: extension,
        size: size,
        mimetype: mime_type
      })
    } catch(e){
      console.log("upload error", e);
      res.send("Processing error.");
    }
  },

  remove: async (req, res) => {
    try {
      let { id }  = req.params;
      console.log("id", id);
      let query = await db.files.findAll({
        where: {
          "id": Number(id)
        }
      });
      let { name } = query[0].dataValues;
      //rm from db
      await db.files.destroy({
        where: {
          id: Number(id)
        }
      });
      //rm from fs
      await fs.unlink(download_path + name);
      res.send("File deleted.")
    } catch(e){
      console.log("upload error", e);
      res.send("Processing error.");
    }
  },

  update: async (req, res) => {
    try {
      let { id }  = req.params;
      console.log("id", id);
      let { originalname: _name, mimetype, path, size }  = req.file;
      let extension = _name.split(".")[1];
      let content = await fs.readFile(path);
      await fs.rename(path, download_path + _name);
      console.log(_name, mimetype, size);
      let result = await db.files.update({
        name: _name,
        extension: extension,
        mime_type: mimetype,
        size: size,
        content: content
      }, {
        where: {
          id: Number(id)
        }
      });
      console.log("result", result);
      res.send("File uploaded!")
    } catch(e){
      console.log("upload error", e);
      res.send("Processing error.");
    }
  },
}

export const { upload, download, get, remove, update } = functions;
