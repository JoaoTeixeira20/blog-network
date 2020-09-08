const router = require('express').Router();

const authenticator = require('../middleware/authenticator')

const PostsController = require('../controllers/PostsController')

//routes
router.get('/:username', authenticator.authenticateToken , PostsController.getPostsByUser)

router.get('/', PostsController.getPosts)

router.post('/', authenticator.authenticateToken, PostsController.setPost)

router.delete('/', authenticator.authenticateToken, PostsController.deletePost)

module.exports = router