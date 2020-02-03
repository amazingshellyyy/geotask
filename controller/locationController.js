const db = require('../models');

// Location Index
const index = (req, res) => {
  db.Location.find({})
    .populate('item')
    .exec((error, indexLocation) => {
      if (error) {
        // return to exit
        return res
          .status(500)
          .json({ message: 'Something went wrong.', error: error });
      }
      const responseObj = {
        status: 200,
        data: indexLocation,
        requestedAt: new Date().toLocaleString()
      };
      res.status(200).json(responseObj);
    });
};

// Location Create
const create = (req, res) => {
  db.Location.create(req.body, (error, createdLocation) => {
    if (error) {
      // return to exit
      return res
        .status(500)
        .json({ message: 'Something went wrong.', error: error });
    }
    const responseObj = {
      status: 200,
      data: createdLocation,
      requestedAt: new Date().toLocaleString()
    };
    res.status(200).json(responseObj);
  });
};

// Location Create Refactor
const createRefactor = async (req, res) => {
  try {
    console.log('Finding Todo List');
    const foundToDoList = await db.ToDoList.findById(req.params.id);
    console.log('Assigning New Location');
    const newLocation = await db.Location.create(req.body);
    console.log('Updating Todo List with New Location');
    foundToDoList.location.push(newLocation);
    console.log('Saving Todo List');
    const savedToDoList = await foundToDoList.save();
    res.status(200).json(savedToDoList);
  } catch (error) {
    return res.status(500).json(error);
  }
};

// Location Show
const show = (req, res) => {
  db.Location.findById(req.params.id)
    .populate('item')
    .exec((error, updatedLocation) => {
      if (error) {
        // return to exit
        return res
          .status(500)
          .json({ message: 'Something went wrong.', error: error });
      }
      const responseObj = {
        status: 200,
        data: updatedLocation,
        requestedAt: new Date().toLocaleString()
      };
      res.status(200).json(responseObj);
    });
};

// Location Update
const update = (req, res) => {
  db.Location.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (error, updatedLocation) => {
      if (error) {
        // return to exit
        return res
          .status(500)
          .json({ message: 'Something went wrong.', error: error });
      }
      const responseObj = {
        status: 200,
        data: updatedLocation,
        requestedAt: new Date().toLocaleString()
      };
      res.status(200).json(responseObj);
    });
};

// List Delete
const destroy = (req, res) => {
  db.Location.findByIdAndDelete(req.params.id, (error, deletedLocation) => {
    if (error) {
      // return to exit
      return res
        .status(500)
        .json({ message: 'Something went wrong.', error: error });
    }
    const responseObj = {
      status: 200,
      data: deletedLocation,
      requestedAt: new Date().toLocaleString()
    };
    res.status(200).json(responseObj);
  });
};

module.exports = {
  index,
  create,
  createRefactor,
  show,
  update,
  destroy,
};