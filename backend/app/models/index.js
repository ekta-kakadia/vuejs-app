const dbConfig = require("../config/db.config");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.products = require("./products.model.js")(mongoose);
db.category = require("./category.model.js")(mongoose);
db.user = require("./user.model");

module.exports = db;