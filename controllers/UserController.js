const Users = require('../models/UsersModel');

const authenticator = require('../middleware/authenticator')

//gets the list of all users
exports.getUsers = (req,res) => {
  Users.find()
    .then(users => res.json(users))
    //.then(users => res.json(users.map(user => {return {username:user.username}})))
    .catch(err => res.status(400).json({status:err}));
}

//adds an user
exports.addUser = async (req,res) => {
  const username = req.body.username;
  const password = req.body.password;
  //checks if the user already exists in the database
  Users.findOne({username:username})
    .exec()
    .then(async user => {
      //condition if the username exists
      if (user) {
        res.status(409).json({status:'username exists'})
      //condition if the user can be added
      } else {
        const newUser = new Users({username:username,password:password});
        newUser.save()
          .then(() => res.json({status:`User ${username} added`}))
          .catch(err => res.status(400).json({status:err}))
      }
    })
    .catch(err => res.status(400).json({status:err}))
}

//deletes an user
exports.deleteUser = (req,res) => {
  let username = req.body.username;
  Users.deleteOne({username: username})
    .exec()
    .then(() => res.json(`User ${username} deleted`))
    .catch(err => res.status(400).json({status:err}))
}

//updates an user
exports.updateuser = (req, res) => {
  let oldusername = req.body.oldusername
  let newusername = req.body.newusername

  Users.updateOne({username: oldusername}, {username:newusername})
    .exec()
    .then(() => res.json(`User ${oldusername} updated to ${newusername}`))
    .catch(err => res.status(400).json({status:err}))
}

//logins an user
exports.loginUser = (req,res) => {
  const username = req.body.username;
  const password = req.body.password;

  Users.findOne({username:username})
    .exec()
    .then(user => {
      //if user exists
      if (user) {
        //compares the hashed stored password (the hash is asyncronous so it's need to wait for the hash)
        const AuthenticationStatus = user.isCorrectPassword(password)
        if (AuthenticationStatus){
          const loginToken = authenticator.generateAccessToken(username)
          res.cookie('BearerToken', loginToken, {httponly: true, expires: new Date(Date.now() + 900000)})
          res.cookie('username', username, {httponly: true, expires: new Date(Date.now() + 900000)})
          res.status(200).json({status:'success'})
          return //stop this function if both username and password conditions are met and prevent the res below that throws an error
        }
      }
      res.status(401).json({status:'username not found or incorrect password'})
    })
    .catch(err => {
      res.status(400).json({status:err})
    })
}