
import { db } from "../../db/index.js";
db.sequelize.sync({ force: true });

import { promises as fs } from 'fs';
const download_path = '/var/temp/uploads/'

const functions = {

  upload: async (req, res) => {
    try {
      console.log("upload req", req);
      let { originalname: _name, mimetype, path, size }  = req.file;
      let extension = _name.split(".")[1];
      let content = await fs.readFile(path);
      await fs.rename(path, download_path + _name);
      //console.log(_name, mimetype, size);
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
      //console.log("id", id);
      let result = await db.files.findAll({
        where: {
          "id": Number(id)
        }
      });
      let { name: filename } = result[0].dataValues;
      res.sendFile(download_path + filename)
    } catch(e){
      console.log("upload error", e);
      res.send("Processing error.");
    }
  },
   
  get: async (req, res) => {
    try {
      //console.log(req.url);
      let { id }  = req.params;
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
      });
    } catch(e){
      console.log("upload error", e);
      res.send("Processing error.");
    }
  },

  remove: async (req, res) => {
    try {
      let { id }  = req.params;
      //console.log("id", id);
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
      //console.log("id", id);
      let { originalname: _name, mimetype, path, size }  = req.file;
      let extension = _name.split(".")[1];
      let content = await fs.readFile(path);
      await fs.rename(path, download_path + _name);
      //console.log(_name, mimetype, size);
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
      //console.log("result", result);
      res.send("File uploaded!")
    } catch(e){
      console.log("upload error", e);
      res.send("Processing error.");
    }
  },

  list: async (req, res) => {
    try {
      let { page, list_size }  = req.body;
      page = page ? page : 1;
      //console.log("list req", req.body);
      list_size = list_size ? list_size : 10;
      let offset = (page-1)*list_size;
      //console.log(list_size, offset);
      let result = await db.files.findAll({
        limit: list_size,
        offset: offset
      });
      //console.log("result", result);
      let data = [];
      for (let r of result){
        let { id, name, extension, mime_type, size } = r.dataValues;
        data.push({
          id: id,
          name: name,
          mimetype: mime_type,
          extension: extension,
          size: size
        })
      }
      res.json({
        data: data
      })
    } catch(e){
      console.log("upload error", e);
      res.send("Processing error.");
    }
  },
}

export const { upload, download, get, remove, update, list } = functions;
