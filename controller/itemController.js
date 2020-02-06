const db = require('../models');

// Item Index
const index = (req, res) => {
  db.Item.find({})
    .exec((error, indexItem) => {
      if (error) {
        // return to exit
        return res
          .status(500)
          .json({ message: 'Something went wrong.', error: error });
      }
      const responseObj = {
        status: 200,
        data: indexItem,
        requestedAt: new Date().toLocaleString()
      };
      res.status(200).json(responseObj);
    });
};

// Item Create
const create = async (req, res) => {
  try {
    const foundToDoList = await db.ToDoList.findById(req.params.id);
    const newItem = await db.Item.create(req.body);
    foundToDoList.item.push(newItem);
    const savedTodoList = await foundToDoList.save(); // commits changes to db
    res.status(200).json(savedTodoList);
  } catch (error) {
    return res.status(500).json(error);
  }
};


// Item Update
const update = (req, res) => {
  db.Item.findByIdAndUpdate(req.params.id, req.body, { new: true }, (error, updatedItem) => {
      if (error) {
        // return to exit
        return res
          .status(500)
          .json({ message: 'Something went wrong.', error: error });
      }
      const responseObj = {
        status: 200,
        data: updatedItem,
        requestedAt: new Date().toLocaleString()
      };
      res.status(200).json(responseObj);
    });
};

// Item Delete
const destroy = (req, res) => {
  db.Item.findByIdAndDelete(req.params.id, (error, deletedItem) => {
    if (error) {
      // return to exit
      return res
        .status(500)
        .json({ message: 'Something went wrong.', error: error });
    }
    const responseObj = {
      status: 200,
      data: deletedItem,
      requestedAt: new Date().toLocaleString()
    };
    res.status(200).json(responseObj);
  });
};

module.exports = {
  index,
  create,
  update,
  destroy
};