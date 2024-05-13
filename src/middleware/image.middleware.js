const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { v2 } = require("cloudinary");
const multer = require("multer");

// Configure Cloudinary
v2.config({
  cloud_name: "dwdsnn2cg",
  api_key: "279153486284877",
  api_secret: "8bNC3fR8q4E3YkSVlR3qN_OSLH0",
});

const storage = new CloudinaryStorage({
  cloudinary: v2,
  params: {
    folder: "products",
    format: async (req, file) => "png",
  },
});

const imageUpload = multer({ storage: storage });

module.exports = {
    imageUpload
}