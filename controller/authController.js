const bcrypt = require('bcryptjs');
const db = require('../models');
const jwt = require('jsonwebtoken');


const signup = (req, res) => {
  const userData = req.body;
  console.log(userData);

  /* Validating Sign up Form */
  if (!userData.email && !userData.password) {
    return res.status(400).json({ message: 'All fileds are required' })
  }

  //check for existing user account
  db.User.findOne({ email: userData.email }, (err, foundUser) => {
    if (err) return res.status(400).json({ message: 'Bad request, tyr again' });

    //return error if account alraedy exist
    if (foundUser) return res.status(400).json({ message: 'Email is already been registered, please try again' });
    // res.json({ message: 'hi' });
    console.log('bf hash', userData.password);
    //if doesn't exist, we generate hash Salt ( make the password hard to crack)
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return res.status(400).json({ message: 'Something went wrong, try again' });
      bcrypt.hash(userData.password, salt, (err, hash) => {
        if (err) return res.status(400).json({ message: 'Something went wrong, try again' });
        const { email, password } = req.body;
        const newUser = {
          email,
          password: hash
        }
        console.log('afterhash', hash);
        db.User.create(newUser, (err, createdUser) => {
          if (err) return res.status(400).json({ message: "Bad Request, Please try again", err: err.errmsg });
          jwt.sign({ foo: newUser._id }, 'shhhhh', { expiresIn: '10h' }, (err, jwt) => {
            if (err) return res.status(500).json({
              status: 503,
              errors: [{ message: 'access forbidden' }],
            });
            res.status(200).json({ jwt });
            // res.status(201).json({message: 'Logged In'});
          });
        });

        
      });
    });
  });

}

const login = (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({
      status: 400,
      errors: [{ message: 'Please enter your email and password' }],
    });
  }
  db.User.findOne({ email: req.body.email }, (err, foundUser) => {


    if (err) return res.status(500).json({
      status: 500,
      errors: [{ message: 'Something went wrong. Please try again' }],
    });
    if (!foundUser) {
      return res.status(400).json({
        status: 400,
        errors: [{ message: 'Username or password is incorrect' }],
      });
    }
    bcrypt.compare(req.body.password, foundUser.password, (err, isMatch) => {
      if (err) return res.status(500).json({
        status: 500,
        errors: [{ message: 'Something went wrong. Please try again' }],
      });
      if (isMatch) {
        /* jwt */
        jwt.sign({ foo: foundUser._id }, 'shhhhh', { expiresIn: '10h' }, (err, jwt) => {
          if (err) return res.status(500).json({
            status: 503,
            errors: [{ message: 'access forbidden' }],
          });
          res.status(200).json({ jwt });
          // res.status(201).json({message: 'Logged In'});
        });
      } else {
        return res.json({
          status: 400,
          errors: [{ message: 'Username or password is incorrect' }],
        });
      }
    });
  });
};

const socialSignup = (req, res) => {
  const userData = req.body;
  console.log('userGoogle', userData);
  //check for existing user account
  db.User.findOne({ email: userData.email }, (err, foundUser) => {
    if (err) return res.status(400).json({ message: 'Bad request, try again' });
    //return error if account alraedy exist
    if (foundUser) return res.status(400).json({ message: 'Email is already been registered, please try again' });
  });
  db.User.create(userData, (err, createdUser) => {
    if (err) return res.status(400).json({ message: "Bad Request, Please try again", err: err.errmsg });
    res.status(201).json(createdUser);
    // res.json({message: 'It is from Google!'});
  });
}


const socialLogin = (req, res) => {
  const userData = req.body;
  console.log('userGoogle', userData);
  //check for existing user account
  db.User.findOne({ email: userData.email }, (err, foundUser) => {
    if (err) return res.status(400).json({ message: 'Bad request, tyr again' });
    //return error if account alraedy exist
    if (!foundUser) {
      return res.status(400).json({
        status: 400,
        errors: [{ message: 'you haven\'t sign up' }],
      });
    }
    if (foundUser) {
      const isMatch = foundUser.googleToken === userData.googleToken;
      if (isMatch) {
        /* jwt */
        jwt.sign({ foo: foundUser._id }, 'shhhhh', { expiresIn: '10h' }, (err, jwt) => {
          if (err) return res.status(500).json({
            status: 503,
            errors: [{ message: 'access forbidden' }],
          });
          res.status(200).json({ jwt });
        });
      }
    };
})
}

module.exports = {
  signup,
  login,
  socialSignup,
  socialLogin,
}