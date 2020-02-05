const jwt = require('jsonwebtoken');
const db = require('../models');


const verify = (req, res, next) => {
  console.log('req.headers',req.headers);
  const header = req.headers.authorization;
  
  if (typeof header !== 'undefined') {
    const bearer = header.split(' ');
    const token = bearer[1];
    console.log('token', token);
    jwt.verify(token, 'shhhhh', function (err, decoded) {
      if (err) return res.status(400).json({ message: 'You are not authorized' });
      // if (err) return res.send('<h2>404: Not Found</h2>');
      // console.log(decoded.foo);// bar, foundUser._id
      // const UserId = decoded.foo;
      console.log(decoded);
      console.log('curUserId',decoded.foo);
      
      req.curUserId = decoded.foo;
      // res.json({ message: 'Authorized', userIddecode: decoded.foo });
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