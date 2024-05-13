const express = require("express");
const { Admin } = require("../../../controllers");
const { imageUpload } = require("../../../middleware/image.middleware");
const router = express.Router();

const productsCtrl = new Admin.ProductsController.ProductController();

// add middleware for check admin aceess
router.post("/", imageUpload.single("image"), async (req, res) => {
  let productsResult = await productsCtrl.create(req);
  res.status(productsResult.status).send(productsResult);
});

// add middleware for check admin aceess
router.post("/category", async (req, res) => {
  let categoryResult = await productsCtrl.categoryCreate(req);
  res.status(categoryResult.status).send(categoryResult);
});

module.exports = router;
