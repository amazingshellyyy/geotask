/* Set up */
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 4000;


const db = require('./models');
/* middleware */


app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


/* View Routes */

app.get("/",(request, response)=>{
  response.sendFile('/views/index.html', {
      root: __dirname
  });
} );
app.get("/create",(request, response)=>{
  response.sendFile('/views/create.html', {
      root: __dirname
  });
} );
app.get("/signup",(request, response)=>{
  response.sendFile('/views/signup.html', {
      root: __dirname
  });
} );
app.get("/login",(request, response)=>{
  response.sendFile('/views/login.html', {
      root: __dirname
  });
} );
app.get("/mapview",(request, response)=>{
  response.sendFile('/views/mapview.html', {
      root: __dirname
  });
} );
app.get("/detail",(request, response)=>{
  response.sendFile('/views/detail.html', {
      root: __dirname
  });
} );



/* API Routes */



/* 404 */
app.use((request, response, next)=>{
  response.send('<h2>404: Not Found</h2>');
})


app.listen(PORT,()=> console.log(`server running at http://localhost:${PORT}`));