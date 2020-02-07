const mongoose = require('mongoose');
const DB_URI = mongoose.connect( process.env.MONGODB_URI || "YOUR CURRENT LOCALHOST DB CONNECTION STRING HERE" );

mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('mongoDB Connected'))
  .catch((err) => console.log(err));

  module.exports = {
      User: require('./User'),
      ToDoList: require('./ToDoList'),
      Location: require('./Location'),
      Item: require('./Item'),
  };