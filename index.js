const express = require('express')
const bodyParser = require('body-parser')
const db = require('./queries');
const app = express()
const port = 3000;

const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/users', db.getUsers);
app.post('/newuser', db.setUser)

app.listen(port, () => {
    console.log(`App running on port ${port}.`);
  })