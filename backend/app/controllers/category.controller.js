const db = require("../models");
const Category = db.category;

// Gets all categories

exports.findAll = (req, res) => {
  var condition = {};
  Category.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};
