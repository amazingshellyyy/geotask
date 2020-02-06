const db = require('../models');


// const showProfile = ((req, res) => {
//   console.log(req.curUserId);
// 	db.User.findById(req.curUserId, (err, foundUser) => {
//     if (err) return res.error(500, "something is wrong. try again");
//     console.log(foundUser);
// 	  res.status(200).json(foundUser);
// 	})
// });

const showProfile = async (req, res) => {
	try {
		console.log(req.curUserId);
		const foundUser = await db.User.findById(req.curUserId)
		const foundLists = await db.ToDoList.find({ user: foundUser._id }).populate('item location');
		foundUser.toDoList = foundLists;
		console.log(foundUser);
		res.status(200).json(foundUser);
	} catch (err) {
		return res.error(500, "something is wrong. try again");
	}


};

module.exports = {
	showProfile
}