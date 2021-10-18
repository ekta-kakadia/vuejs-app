const { authJwt } = require("../middlewares");
const products = require("../controllers/products.controller.js");

module.exports = app => {
  
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });

    app.post("/api/products/add", authJwt.verifyToken, products.create);
  
    app.post("/api/products",  authJwt.verifyToken, products.findAll);
  
    app.get("/api/products/:id",  authJwt.verifyToken, products.findOne);
  
    app.put("/api/products/:id",  authJwt.verifyToken, products.update);
  
    app.delete("/api/products/:id",  authJwt.verifyToken, products.delete);
  };