const db = require('../models');

const showProfile = async (req, res) => {
	try {
		const foundUser = await db.User.findById(req.curUserId)
		const foundLists = await db.ToDoList.find({ user: foundUser._id }).populate('item location');
		foundUser.toDoList = foundLists;
		res.status(200).json(foundUser);
	} catch (err) {
		return res.error(500, "something is wrong. try again");
	}


};

module.exports = {
	showProfile
}