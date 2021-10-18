/* eslint-disable no-unused-vars */
const { response } = require("express");
const db = require("../models");
const Products = db.products;

// Adds product
exports.create = (req, res) => {
  const products = new Products({
    name: req.body.name,
    category: req.body.category,
    image: req.body.image,
    price: req.body.price,
    discount: req.body.discount,
    net_price: req.body.net_price,
    description: req.body.description,
  });

  products
    .save(products)
    .then((data) => {
      res.send({ data: data, message: "Product added successfully" });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the product.",
      });
    });
};

// Gets products list
exports.findAll = (req, res) => {
  let condition = {}
  if (req.body.key === "" && req.body.value === "") {
    condition = {};
  } else if (req.body.key === "name" && req.body.value !== "") {
    condition = { "name": { $regex: req.body.value } };
  } else if (req.body.key === "category" && req.body.value !== "") {
    condition = { "category": { $regex: req.body.value } };
  } 
  Products.find(condition)
    .skip(Number(req.query.skip))
    .limit(10)
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

// Gets single product base on id

exports.findOne = (req, res) => {
  const id = req.params.id;

  Products.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found product with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving product with id=" + id });
    });
};

// updates product
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;
  Products.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update product with id=${id}. Maybe product was not found!`,
        });
      } else res.send({ message: "product was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating product with id=" + id,
      });
    });
};

// deletes product

exports.delete = (req, res) => {
  const id = req.params.id;

  Products.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete product with id=${id}. Maybe product not found!`,
        });
      } else {
        res.send({
          message: "product deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete product with id=" + id,
      });
    });
};
