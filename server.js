/* Set up */
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 4000;
const ctrl = require('./controller');
const mw = require('./middleware');
const db = require('./models');

/* Middleware */
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/* View Routes */
app.get('/', (req, res) => {
  res.sendFile('/views/index.html', {
    root: __dirname
  });
});
app.get('/profile', (req, res) => {
  res.sendFile('/views/profile.html', {
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


/* API Routes */
app.get('/api/v1/users', (req, res) => {
  db.User.find({}, (err, allUsers) => {
    if (err) return response.status(400).json(err);

    //Respond with the requested data
    res.json(allUsers);
  })
})

/* ----------- User Signup & Login */
app.post('/api/v1/signup', ctrl.auth.signup);
app.post('/api/v1/login', ctrl.auth.login);
app.post('/api/v1/socialSignup', ctrl.auth.socialSignup);
app.post('/api/v1/socialLogin', ctrl.auth.socialLogin);
app.post('/api/v1/verify', mw.auth.verify);
app.post('/api/v1/profile', mw.auth.verify,
  ctrl.user.showProfile);

/* ----------- ToDo List Routes */
// List index
app.get('/api/v1/list/index',mw.auth.verify, ctrl.toDoList.index);
// List Create
app.post('/api/v1/list/create', mw.auth.verify, ctrl.toDoList.create);
// List Show
app.get('/api/v1/list/detail/:id', mw.auth.verify, ctrl.toDoList.show);
// List Update Title
app.put('/api/v1/list/detail/:id', mw.auth.verify, ctrl.toDoList.update);
// List Delete
app.delete('/api/v1/list/detail/:id', ctrl.toDoList.destroy);

/* -----------  Item Routes */
// Item index
app.get('/api/v1/item/index', ctrl.item.index);
// Item Create
app.post('/api/v1/list/:id/item', ctrl.item.create);
// Item Update
app.put('/api/v1/item/detail/:id', mw.auth.verify, ctrl.item.update);
// Item Delete
app.delete('/api/v1/item/detail/:id', ctrl.item.destroy);

/* ----------- Location Routes */
// Location index
app.get('/api/v1/location/index', ctrl.location.index);
// Location Create
app.post('/api/v1/list/:id/location', ctrl.location.create);
// Location Show
app.get('/api/v1/location/:id', ctrl.location.show);
// Location Update
app.put('/api/v1/location/:id', ctrl.location.update);
// Location Delete
app.delete('/api/v1/location/:id', ctrl.location.destroy);

/* ----------- 404 */
app.use((request, response, next) => {
  response.send('<h2>404: Not Found</h2>');
})

app.listen(PORT, () => console.log(`server running at http://localhost:${PORT}`));