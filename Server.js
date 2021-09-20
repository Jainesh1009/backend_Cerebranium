const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');


const subject = require('./Routes/Subject');

const app = express();

app.use(cors({origin : '*'}));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

const con = mysql.createConnection({ 
  host: "127.0.0.1",
  user: "root",
  database: "subject_management"
});

con.connect(function(err){
    if(err) throw err;
})

app.use('/api/subject',subject);

//port
const PORT = process.env.PORT || 4000;

//run the server
app.listen(PORT , () => console.log(`app listen on port ${PORT}`))