// const db = require('../models');
// index

// create
// const listCreate = (req, res) => {
//   db.ToDoList.create(req.body, (error, createdToDoList) => {
//     if (error) {
//       // return to exit
//       return res
//         .status(500)
//         .json({ message: 'Something went wrong.', error: error });
//     }
//     const responseObj = {
//       status: 200,
//       data: createdToDoList,
//       requestedAt: new Date().toLocaleString()
//     };
//     res.status(200).json(responseObj);
//   })
// }
// show
// showAsync
// update
// delete

// module.exports = {
//   index,
//   create,
//   show,
//   showAsync,
//   update,
//   delete
// };