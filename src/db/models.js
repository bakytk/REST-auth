
const obj = {
  files: (sequelize, Sequelize) => {
    const File = sequelize.define("files", {
      title: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      binary: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      }
    });
    return File;
  },
  users: (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
      name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        validate: {
          isEmail: true
        }
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      }
    });
    return User;
  },
}

export const { files, users} = obj;