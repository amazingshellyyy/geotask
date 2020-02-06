/* -------- Item Schema Outline -------- */
// ItemId
// itemName - string
// status - boolean
// ToDoListId - ref

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  itemName: {
    type: String,
    required: true
  },
  status: Boolean,
  toDoList: {
    type: Schema.Types.ObjectId,
    ref: 'ToDoList'
  },
})

const Item = mongoose.model('Item', itemSchema);
module.exports = Item;