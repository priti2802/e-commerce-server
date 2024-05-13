const mongoose = require("mongoose");

const categoriesSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const categoriesModel = mongoose.model("categories", categoriesSchema);

module.exports = categoriesModel;
