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
  //create ToDoList and get Id
  db.Location.findOne({ locationName: "New York" }, (err, foundLocation) => {
    if (err) {
      // return to exit
      return res
        .status(500)
        .json({ message: 'Something went wrong.', err: err });
    }
    if (!foundLocation) {
      db.ToDoList.create(req.body.list, (err, createdToDoList) => {
        if (err) {
          // return to exit
          return res
            .status(500)
            .json({ message: 'Something went wrong.', err: err });
        }
        db.Location.create(req.body.location, (err, createdLocation) => {
          if (err) {
            // return to exit
            return res
              .status(500)
              .json({ message: 'Something went wrong.', err: err });
          }
          createdToDoList.location = createdLocation._id;
        })
        const Items = req.body.items;
        console.log('if',req.body.items);
        for (let i = 0; i < Items.length; i++) {
          const item = Items[i];
          const itemObj = {
            itemName: item,
            status: false,
          }
          db.Item.create(itemObj, (err, createdItem) => {
            if (err) {
              // return to exit
              return res
                .status(500)
                .json({ message: 'Something went wrong.', err: err });
            }
            console.log('createdItem',createdItem);
            createdToDoList.item.push(createdItem._id);
            if(i === Items.length-1){
              createdToDoList.save();
              console.log(createdToDoList);
              return res.json({createdToDoList});
            }
          })
          
        }
      })
    } else {
      db.ToDoList.create(req.body.list, (err, createdToDoList) => {
        if (err) {
          // return to exit
          return res
            .status(500)
            .json({ message: 'Something went wrong.', err: err });
        }
        createdToDoList.location = foundLocation._id;
        const Items = req.body.items;
        console.log('else',req.body.items);
        console.log('else',Items);
        for (let i = 0; i < Items.length; i++) {
          const item = Items[i];
          const itemObj = {
            itemName: item,
            status: false,
          }
          
          db.Item.create(itemObj, (err, createdItem) => {
            if (err) {
              // return to exit
              return res
                .status(500)
                .json({ message: 'Something went wrong.', err: err });
            }
            createdToDoList.item.push(createdItem._id);
            if(i === Items.length-1){
              createdToDoList.save();
              console.log(createdToDoList);
              return res.json({createdToDoList});
            }
          })
          
        }
        
      })
    }
  });
  
  
  
};

// List Show
const show = (req, res) => {
  console.log(req.params);
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
  // db.ToDoList.findById(req.params.id, (err, foundList) => {
  //   if (err) res.status(400).json(err);

  //   res.json(foundList);
  // })
};

// List Update
// TODO Update this for async await to populate list items.
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