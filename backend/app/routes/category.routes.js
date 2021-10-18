const { authJwt } = require("../middlewares");
const category = require("../controllers/category.controller.js");

module.exports = (app) => {

  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/category",  authJwt.verifyToken, category.findAll);
};

