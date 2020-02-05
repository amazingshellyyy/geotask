const db = require('../models');

// List Index
const index = (req, res) => {
  db.ToDoList.find({})
    .populate('item')
    .exec((error, indexToDoList) => {
      if (error) {
        // return to exit
        return res
          .status(500)
          .json({ message: 'Something went wrong.', error: error });
      }
      const responseObj = {
        status: 200,
        data: indexToDoList,
        requestedAt: new Date().toLocaleString()
      };
      res.status(200).json(responseObj);
    });
};

// List Create
const create = (req, res) => {
  db.ToDoList.create(req.body, (error, createdToDoList) => {
    if (error) {
      // return to exit
      return res
        .status(500)
        .json({ message: 'Something went wrong.', error: error });
    }
    const responseObj = {
      status: 200,
      data: createdToDoList,
      requestedAt: new Date().toLocaleString()
    };
    res.status(200).json(responseObj);
  });
};

// List Show
const show = (req, res) => {
  db.ToDoList.findById(req.params.id)
    .populate('item')
    .exec((error, updatedToDoList) => {
      if (error) {
        // return to exit
        return res
          .status(500)
          .json({ message: 'Something went wrong.', error: error });
      }
      const responseObj = {
        status: 200,
        data: updatedToDoList,
        requestedAt: new Date().toLocaleString()
      };
      res.status(200).json(responseObj);
    });
};

// List Update
const updateTitle = (req, res) => {
  db.ToDoList.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (error, updatedToDoList) => {
      if (error) {
        // return to exit
        return res
          .status(500)
          .json({ message: 'Something went wrong.', error: error });
      }
      const responseObj = {
        status: 200,
        data: updatedToDoList,
        requestedAt: new Date().toLocaleString()
      };
      res.status(200).json(responseObj);
    });
};

// List Delete
const destroy = (req, res) => {
  db.ToDoList.findByIdAndDelete(req.params.id, (error, deletedToDoList) => {
    if (error) {
      // return to exit
      return res
        .status(500)
        .json({ message: 'Something went wrong.', error: error });
    }
    const responseObj = {
      status: 200,
      data: deletedToDoList,
      requestedAt: new Date().toLocaleString()
    };
    res.status(200).json(responseObj);
  });
};

module.exports = {
  index,
  create,
  show,
  updateTitle,
  destroy
};