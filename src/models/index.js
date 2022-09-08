
const dbFunction = (sequelize, Sequelize) => {
    const File = sequelize.define("files", {
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      published: {
        type: Sequelize.BOOLEAN
      }
    });
    return File;
  };

export { dbFunction};