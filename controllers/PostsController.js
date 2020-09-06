const Posts = require('../models/PostsModel');
const Users = require('../models/UsersModel');

exports.getPosts = (req, res) => {
  Posts.find()
    .then(posts => res.json(posts))
    .catch(err => res.status(400).json({status:err}));
}

exports.getPostsByUser = (req, res) => {
  const username = req.params.username
  Users.findOne({username:username})
    .exec()
    .then(user => {
      if (user) {
        const userId = user._id
        Posts.find({"author.id":userId})
          .exec()
          .then(posts => {
            if (posts.length >= 1){
              res.json(posts)
            }else{
              res.status(404).json({status:'no post content'})
            }
          })
      }else{
        res.status(404).json({status:'no user content'})
      }
    })
    .catch(err => res.status(400).json({status:err}))
}

exports.setPost = (req, res) => {
  const username = req.cookies.username
  const title = req.body.title
  const content = req.body.content
  Users.findOne({username:username})
    .exec()
    .then(user => {
      if (user){
        //gets the user id
        const userId = user._id
        const newPost = new Posts({
          title:title,
          content:content,
          author:{
            id:userId,
            username:username
          }
        })
        //creates a new post with username details
        newPost.save()
          .then(() => res.json({status:'success'}))
          .catch(err => res.status(400).json({status:err}))
      }
    })
    .catch(err => res.status(400).json({status:err}))
}

exports.deletePost = (req, res) => {
  const postId = req.body.id
  Posts.deleteOne({_id:postId})
    .exec()
    .then(() => res.json({status:'success'}))
    .catch(err => res.status(400).json({status:err}))
}