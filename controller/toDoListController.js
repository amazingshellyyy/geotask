const db = require('../models');

// List Index
const index = (req, res) => {
  // console.log(req.curUserId);
  db.ToDoList.find({ user: req.curUserId })
    .populate('item')
    .populate('location')
    .exec((error, indexToDoLists) => {
      if (error) {
        // return to exit
        return res
          .status(500)
          .json({ message: 'Something went wrong.', error: error });
      }
      res.status(200).json(indexToDoLists);
    });
};

// List Create
const create = (req, res) => {
  //create ToDoList and get Id
  db.Location.findOne({ locationName: req.body.location.locationName }, (err, foundLocation) => {
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
          createdToDoList.user = req.curUserId;
        })
        const Items = req.body.items;
        console.log('if', req.body.items);
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
            console.log('createdItem', createdItem);
            createdToDoList.item.push(createdItem._id);
            if (i === Items.length - 1) {
              createdToDoList.save();
              console.log(createdToDoList);
              return res.json({ createdToDoList });
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
        createdToDoList.user = req.curUserId;
        const Items = req.body.items;
        console.log('else', req.body.items);
        console.log('else', Items);
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
            if (i === Items.length - 1) {
              createdToDoList.save();
              console.log(createdToDoList);
              return res.json({ createdToDoList });
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
    .populate('location')
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
// TODO Update this for async await to populate list items.
const update = (req, res) => {
  db.ToDoList.findById(req.params.id)
    .populate('item')
    .populate('location')
    .exec((err, foundToDoList) => {
      if (err) return res.status(500).json({ message: 'Something went wrong at finding to do list.', err: err });
      foundToDoList.listTitle = req.body.list.listTitle;
      foundToDoList.dateDue = req.body.list.dateDue;

      db.Location.findOne({ locationName: req.body.location.locationName }, (err, foundLocation) => {
        if (err) return res.status(500).json({ message: 'Something went wrong at finding location name.', err: err });
        if (!foundLocation) {
          db.Location.create(req.body.location, (err, createdLocation) => {
            if (err) return res.status(500).json({ message: 'Something went wrong.', err: err });
            console.log('createdLocation', createdLocation);
            console.log('in new location');
            console.log('foundTODOLISt bf update', foundToDoList);
            console.log('createdLocation ID', createdLocation._id)
            
            foundToDoList.item = [];
            const Items = req.body.items;
            for (let i = 0; i < Items.length; i++) {
              const item = Items[i];
              const itemObj = {
                itemName: item.itemName,
                status: item.status
              }
  
              db.Item.create(itemObj, (err, createdItem) => {
                if (err) {
                  // return to exit
                  return res
                    .status(500)
                    .json({ message: 'Something went wrong at create items in if.', err: err });
                }
                foundToDoList.item.push(createdItem._id);
                if (i === Items.length - 1) {
                  // console.log('foundToDOList bf save',foundToDoList);
                  foundToDoList.location = createdLocation._id;
                  foundToDoList.save();
                  console.log('foundTODOLISt af update', foundToDoList);
                  // console.log('foundToDOList at save',foundToDoList);
                  return res.json({ foundToDoList });
                }
              })
  
            }
          })
        

        } else if (foundLocation._id !== foundToDoList.location) {
          
          foundToDoList.item = [];
          const Items = req.body.items;
          for (let i = 0; i < Items.length; i++) {
            const item = Items[i];
            const itemObj = {
              itemName: item.itemName,
              status: item.status
            }

            db.Item.create(itemObj, (err, createdItem) => {
              if (err) {
                // return to exit
                return res
                  .status(500)
                  .json({ message: 'Something went wrong at create Items in else if.', err: err });
              }
              foundToDoList.item.push(createdItem._id);
              if (i === Items.length - 1) {
                // console.log('foundToDOList bf save',foundToDoList);
                foundToDoList.location = foundLocation._id;
                foundToDoList.save();

                // console.log('foundToDOList at save',foundToDoList);
                return res.json({ foundToDoList });
              }
            })

          }
        } else {
          res.status(500).json({ message: 'Found but equal to current' })
        }


      })


    });

  //update ToDoList title, dateDue
  //find location based on String, if find, compare with ToDolist location id, if different, update ToDoList
  //if not find, create location, get id and update Todolist
  //drop all item on ToDoList and create new item by for loop and push all to array
  //save()
  //res.json(updatedToDoList)


};

// List Delete
const destroy = (req, res) => {
  db.ToDoList.findByIdAndDelete(req.params.id, (error, deletedToDoList) => {
    if (error) return res.status(500).json({ message: 'Something went wrong.', error: error });

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
  update,
  destroy
};