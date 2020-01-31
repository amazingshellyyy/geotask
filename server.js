/* Set up */
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 4000;


const db = require('./models');
/* middleware */


app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


/* View Routes */

app.get('/', (req, res) => {
  res.sendFile('/views/index.html', {
    root: __dirname
  });
});
app.get('/create', (req, res) => {
  res.sendFile('/views/create.html', {
    root: __dirname
  });
});
app.get('/signup', (req, res) => {
  res.sendFile('/views/signup.html', {
    root: __dirname
  });
});
app.get('/login', (req, res) => {
  res.sendFile('/views/login.html', {
    root: __dirname
  });
});
app.get('/mapview', (req, res) => {
  res.sendFile('/views/mapview.html', {
    root: __dirname
  });
});
app.get('/detail', (req, res) => {
  res.sendFile('/views/detail.html', {
    root: __dirname
  });
});
const ctrl = require('./controller')

/* API Routes */
app.get('/api/v1/users', (req, res) => {
  db.User.find({}, (err, allUsers) => {
    if (err) return response.status(400).json(err);

    //Respond with the requested data
    res.json(allUsers);
  })
})

/* ToDo List Routes */
/* TODO Refactor this section to send to toDoListController */

// List index
app.get('/api/v1/index', ctrl.toDoList.index);

// List Create
app.post('/api/v1/create', ctrl.toDoList.create);

// List Show
app.get('/api/v1/detail/:id', ctrl.toDoList.show);

// List Update
app.put('/api/v1/detail/:id', ctrl.toDoList.update);

// List Delete
app.delete('/api/v1/detail/:id', ctrl.toDoList.destroy);

// User Signup & Login
app.post('/api/v1/signup', ctrl.auth.signup);
app.post('/api/v1/login', ctrl.auth.login);
app.post('/api/v1/socialSignup', ctrl.auth.socialSignup);

/* 404 */
app.use((request, response, next) => {
  response.send('<h2>404: Not Found</h2>');
})


app.listen(PORT, () => console.log(`server running at http://localhost:${PORT}`));