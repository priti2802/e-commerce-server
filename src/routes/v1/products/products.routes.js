const express = require("express");
const { Products } = require("../../../controllers");
const { imageUpload } = require("../../../middleware/image.middleware");
const router = express.Router();

const productsCtrl = new Products.ProductsController.ProductController();

router.get("/test-api", async (req, res) => {
  const message = "============ Hurrey !!! API is running ================ ";
  console.log(message);

  res.status(200).send({
    response: message,
    Mode: process.env.RUN_MODE,
  });
});

router.get("/", async (req, res) => {
  let productsResult = await productsCtrl.getAll(req);
  res.status(productsResult.status).send(productsResult);
});

router.get("/cart", async (req, res) => {
  let cartResult = await productsCtrl.getAllCart(req);
  res.status(cartResult.status).send(cartResult);
});

router.post("/cart", async (req, res) => {
  let cartResult = await productsCtrl.addToCart(req);
  res.status(cartResult.status).send(cartResult);
});

module.exports = router;
