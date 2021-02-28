const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  image_url: {
    type: String,
  },
});

module.exports = mongoose.models?.Post || mongoose.model("Post", PostSchema);
