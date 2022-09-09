
const {
    DB_USER,
    DB_HOST,
    DB_NAME,
    DB_PWD
}  = process.env;

const options = {
    host: DB_HOST,
    dialect: "mysql",
    operatorsAliases: false,
    pool: { 
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
//console.log("options", DB_NAME, DB_USER, DB_PWD, DB_HOST);

import Sequelize from "sequelize";
import { files, users } from "./models.js";

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PWD, options);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.files = files(sequelize, Sequelize);
db.users = users(sequelize, Sequelize);

export { db }; 