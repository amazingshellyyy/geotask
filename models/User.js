/* -------- User Schema Outline -------- */
// UserId
// email - string
// password - string(encrypt)
// LocationId - ref
// ToDoListId - ref

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    // required: [true, 'Email is required'],
    trim: true,
    unique: [true, 'Email has already been registered.'],
    lowercase: true,
  },
  password: {
    type: String,
    // required: [true, 'Password is required'],
    minlength: [4, 'Password must be at least 4 characters.'],
  },
  location: {
    type: Schema.Types.ObjectId,
    ref: 'Location',
    // required: [true, 'Please enter your home address.']
  },
  toDoList: [{
    type: Schema.Types.ObjectId,
    ref: 'ToDoList'
  }],
  GoogleToken: String
});

const User = mongoose.model('User', userSchema);
module.exports = User;