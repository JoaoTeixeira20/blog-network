const jwt = require("jsonwebtoken");

const config = require('../config/server-config')

exports.authenticateToken = (req, res, next) => {
    try {
      //const token = req.headers.authorization;
      const token = req.cookies.BearerToken
      //if this fails it's catched below
      const decodedToken = jwt.verify(token, config.token_secret);
      //const username = decodedToken.username;
      //if (req.body.username && req.body.username !== username) {
      if (!token || !decodedToken){
        throw 'Invalid token auth';
      } else {
        next();
      }
    } catch (e) {
      res.status(401).json({error: e}); //new Error('Invalid request!')
    }
  }

exports.generateAccessToken= username => {
  // expires after half and hour (1800 seconds = 30 minutes)
  return jwt.sign({username:username}, config.token_secret, { expiresIn: '1800s' });
}