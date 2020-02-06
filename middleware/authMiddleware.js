const jwt = require('jsonwebtoken');
const db = require('../models');


const verify = (req, res, next) => {
  const header = req.headers.authorization;

  if (typeof header !== 'undefined') {
    const bearer = header.split(' ');
    const token = bearer[1];
    jwt.verify(token, 'shhhhh', function (err, decoded) {
      if (err) return res.status(400).json({ message: 'You are not authorized' });
      req.curUserId = decoded.foo;
      next();
    })
  } else {
    //If header is undefined return Forbidden (403)
    res.redirect('http://localhost:4000/login');
  }


}


module.exports = {
  verify
}