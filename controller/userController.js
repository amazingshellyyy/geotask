const db = require('../models');


const showProfile = ((req, res) => {
  console.log(req.curUserId);
	db.User.findById(req.curUserId, (err, foundUser) => {
    if (err) return res.error(500, "something is wrong. try again");
    console.log(foundUser);
	  res.status(200).json(foundUser);
	})
});


module.exports = {
	showProfile
}