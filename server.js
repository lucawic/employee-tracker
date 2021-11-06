const express = require ('express');
const mysql = require ('mysql');
require('dotenv').config();

const PORT = process.env.PORT || 3001;

app = express ();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//connect to database
const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password: process.env.MYSQL_PW,
    database: 'employees'
});

app.use((req, res) => {
    res.status(404).end();
})

app.listen(PORT, ()=> {
    console.log(`Server is running on PORT: ${PORT}`)
});