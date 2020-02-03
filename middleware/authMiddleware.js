const jwt = require('jsonwebtoken');



const verify = (req, res, next) => {
  // res.json(req.body);
  // const token = req.body.token;

  const header = req.headers['authorization'];
    if(typeof header !== 'undefined') {
        const bearer = header.split(' ');
        const token = bearer[1];
        req.token = token;
        // next();
    } else {
        //If header is undefined return Forbidden (403)
        res.sendStatus(403)
    }
  jwt.verify(req.token, 'shhhhh', function(err, decoded) {
    if (err) return res.status(400).json({message: 'You are not authorized'});
    console.log(decoded.foo) // bar, foundUser._id
    


    // req.currentUser
    res.json({message: 'Authorized', userIddecode : decoded.foo});
  });
  next();
}


module.exports = {
	verify
}