
const express = require('express');
const mysql = require('mysql2');

const app = express();

const bodyParser=require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: 'root@123',
    database: 'office' 
});


db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    
    console.log('Connected to the MySQL database.');
});

app.get('/Info', (_req, res) => {
 res.sendFile(__dirname + '/Ajax_SelectFromInfo.html');
});

app.get('/Display',(req,res)=>{
    let from=req.query.form;

    if (!from) {
        return res.send('Employee ID is required');
    }
    db.query('select ENAME from emp where ENAME!=? order by ENAME ASC',[from],(err,result)=>{
         if (err) {
                console.error('Database query error:', err);
                return res.send('Database error');
            }

        if (result.length === 0) {
                return res.send('Employee ID not found');
            }
            let count=0;

        res.send(JSON.stringify(result));
    })
})


app.listen(9000, () => {
    console.log('http://localhost:9000/Info');
});