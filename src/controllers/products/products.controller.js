const cartsModel = require("../../models/carts.model");
const productsModel = require("../../models/products.model");
const { responseUtils } = require("../../utils");

class ProductController {
  constructor() {}

  async getAll(req) {
    try {
      let { skip = 0, limit = 10, orderByPrice, searchText } = req.query;

      const whereClause = {};

      if (searchText) {
        const searchRegex = new RegExp(searchText, "i"); // 'i' flag for case-insensitive
        whereClause.name = { $regex: searchText };
      }

      const sortObj = {};
      if (Number(orderByPrice) === -1 || Number(orderByPrice) === 1) {
        sortObj.price = Number(orderByPrice);
      } else {
        sortObj.createdAt = -1;
      }

      const allProducts = await productsModel
        .find(whereClause)
        .sort(sortObj)
        .skip(skip)
        .limit(limit)
        .populate("category");

      const productsWithCategoryName = allProducts.map((product) => ({
        ...product.toObject(), // Destructure and spread to keep other properties
        categoryName: product.category ? product.category.name : null, // Add category name if populated
      }));

      return responseUtils.successResponse(
        1,
        "Products fetched successfully!",
        productsWithCategoryName
      );
    } catch (error) {
      return responseUtils.serverError(
        0,
        error.message || "Error while fetching products",
        {},
        error
      );
    }
  }

  async getAllCart(req) {
    try {
      let { userId } = req.query;

      const cartItems = await cartsModel.find({ user: userId });

      if (cartItems.length > 0) {
        await Promise.all(
          cartItems.map(async (item) => {
            item.product = await productsModel.findById(item.productId); // Replace 'Product' with your product model name
          })
        );
      }

      return res.json({
        status: 1,
        message: "Cart fetched successfully!",
        data: cartItems,
      });
      return responseUtils.successResponse(
        1,
        "Products fetched successfully!",
        productsWithCategoryName
      );
    } catch (error) {
      return responseUtils.serverError(
        0,
        error.message || "Error while fetching products",
        {},
        error
      );
    }
  }

  async addToCart(req) {
    try {
      let { productId, quantity, totalPrice, userId } = req.body;

      const cartPayload = {
        productId,
        quantity: Number(quantity),
        totalPrice: Number(totalPrice),
        userId,
      };
      const uploadCart = new cartsModel(cartPayload);
      const cartData = await uploadCart.save();

      return responseUtils.successResponse(1, "Added to cart!", cartData);
    } catch (error) {
      return responseUtils.serverError(
        0,
        error.message || "Error while fetching products",
        {},
        error
      );
    }
  }
}

module.exports = {
  ProductController,
};
