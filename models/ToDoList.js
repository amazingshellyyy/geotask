/* -------- ToDo List Schema Outline -------- */
// ToDoListId
// listTitle - String
// dateCreated - Date
// dateDue - Date
// dateUpdated - Date
// locationId - Object
// ItemId - Array, ref
// UserId - ref

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const toDoListSchema = new Schema({
  listTitle: {
    type: String,
    required: true
  },
  dateCreated: Date,
  dateDue: Date,
  /* TODO Update dateUpdated to pass the current date. */
  dateUpdated: Date,
  location: {
    type: Schema.Types.ObjectId,
    ref: 'Location',
    /* TODO uncomment the line below before pushing to submaster  */
    // required: true
  },
  item: [{
    type: Schema.Types.ObjectId,
    ref: 'Item'
  }],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
})

const ToDoList = mongoose.model('ToDoList', toDoListSchema);
module.exports = ToDoList;