"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(path.join(__dirname, "../configs/database.js"))[env];
const db = {};

const applySearchQuery = require("../libs/sequelize/applySearchQuery");
const applySortQuery = require("../libs/sequelize/applySortQuery");

let sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    timezone: config.timezone,
    define: {
      schema: config.schema,
      migrationStorageTableSchema: config.migrationStorageTableSchema,
      timestamps: true,
      paranoid: true,
      createdAt: "createdAt",
      updatedAt: "updatedAt",
      deletedAt: "deletedAt",
      classMethods: {},
      defaultScope: {},
      hooks: {
        beforeFind(options) {
          // =================================
          // Required for Paginated Request
          // =================================
          applySortQuery(this, options);
          applySearchQuery(this, options);
          // =================================
          // End for Paginated Request
          // =================================
          return options;
        },
        beforeCount(options) {
          // =================================
          // Required for Paginated Request
          // =================================
          applySearchQuery(this, options);
          // =================================
          // End for Paginated Request
          // =================================
          return options;
        },
        // =================================
        // Required for Audit on Create
        // =================================

        // =================================
        // Required for Audit on Update
        // =================================

        // =================================
        // Required for Audit on Delete
        // =================================
        // beforeDestroy(instance, options) {
        //   instance.deletedBy = options.user?.id;
        // }
      },
    },
  }
);

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
