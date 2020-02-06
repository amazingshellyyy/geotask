/* -------- Location Schema Outline -------- */
// LocationID
// locationName - string
// latitude - number (float)
// longitude - number (float)
// ToDoListId - ref

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const locationSchema = new Schema({
  locationName: {
    type: String,
    required: true
  },
  latitude: Number,
  longitude: Number,
  toDoList: [{
    type: Schema.Types.ObjectId,
    ref: 'ToDoList'
  }],
})

const Location = mongoose.model('Location', locationSchema);
module.exports = Location;