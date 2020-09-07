const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postsSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: false,
  },
  content: {
    type: String,
    required: true,
    unique: false
  },
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: {
      type: String,
      required: true,
      unique: false
    }
  }
},{
  timestamps: true,
})

const Posts = mongoose.model('Posts',postsSchema);

module.exports = Posts
