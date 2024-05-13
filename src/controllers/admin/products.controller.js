const categoriesModel = require("../../models/categories.model");
const productsModel = require("../../models/products.model");
const { responseUtils } = require("../../utils");

class ProductController {
  constructor() {}

  async categoryCreate(req) {
    try {
      let { name, description } = req.body;

      const categoryPaylaod = {
        name,
        description,
      };

      const uploadCategory = new categoriesModel(categoryPaylaod);
      const categoryData = await uploadCategory.save();

      return responseUtils.successResponse(
        1,
        "Category created successfully!",
        categoryData
      );
    } catch (error) {
      return responseUtils.serverError(
        0,
        error.message || "Error while creating categoey",
        {},
        error
      );
    }
  }

  async create(req) {
    try {
      let { name, brandName, category, description, price } = req.body;

      const productPaylaod = {
        name,
        brandName,
        category,
        image: req?.file?.path,
        description,
        price,
      };

      const uploadProduct = new productsModel(productPaylaod);
      const productData = await uploadProduct.save();

      return responseUtils.successResponse(
        1,
        "Product created successfully!",
        productData
      );
    } catch (error) {
      return responseUtils.serverError(
        0,
        error.message || "Error while creating product",
        {},
        error
      );
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const deleteProduct = await productsModel.findByIdAndDelete(id);

      return responseUtils.successResponse(
        1,
        "Product created successfully!",
        deleteProduct
      );
    } catch (error) {
      return responseUtils.serverError(
        0,
        error.message || "Error while deleting product",
        {},
        error
      );
    }
  }
}

module.exports = {
  ProductController,
};
