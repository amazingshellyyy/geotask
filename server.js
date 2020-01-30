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



/* API Routes */



/* 404 */
app.use((request, response, next)=>{
  response.send('<h2>404: Not Found</h2>');
})


app.listen(PORT,()=> console.log(`server running at http://localhost:${PORT}`));