const router = require('express').Router();

const authenticator = require('../middleware/authenticator')

const UserController = require('../controllers/UserController')

//routes
router.get('/', UserController.getUsers)

router.delete('/', UserController.deleteUser)

router.post('/', UserController.updateuser)

router.get('/login', UserController.loginUser)

router.post('/signup', UserController.addUser)

router.get('/tokenverify', authenticator.authenticateToken, ((req,res) => {
  const username = req.body.username
  res.json({status:'success',username:username})
}))

module.exports = router