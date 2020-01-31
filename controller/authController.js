const bcrypt = require('bcryptjs');
const db = require('../models');



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
    console.log('bf hash',userData.password);
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
        console.log('afterhash',hash);
				db.User.create(newUser, (err, createdUser) => {
					if (err) return res.status(400).json({ message: "Bad Request, Please try again", err: err.errmsg });
          res.status(201).json(createdUser);
          // res.json({message: 'It is hashed!'});
				});

			});
		});
	}); 
  
}


module.exports = {
	signup,
}