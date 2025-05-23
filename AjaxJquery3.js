var mysql = require('mysql2');
var express = require('express');
var app = express();

app.use(express.static('JQuery'))

app.get('/',function(req,res){
    res.sendFile(__dirname+"/form3.html");
})
var con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root@123",
    database:"shoppingdb"
})

con.connect(function(err){
    if(!err){
        console.log("Connected.....");        
    }
    else {
        console.log("Not Connected.....");
    }
})

app.get('/check-userid', function (req, res) {
    const userid = req.query.userid;
    if (!userid) {
        return res.status(400).json({ message: "User ID is required" });
    }

    const query = "SELECT * FROM users WHERE u_id = ?";
    con.query(query, [userid], function (err, result) {
        if (err) {
            console.log("Query error: " + err);
            return res.status(500).json({ message: "Database error" });
        }

        if (result.length > 0) {
            res.json({ available: false, message: "User ID is already taken" });
        } else {
            res.json({ available: true, message: "User ID is available" });
        }
    });
});


app.post('/login', function (req, res) {
    const { u_id, password } = req.body;

    const query = "SELECT * FROM users WHERE u_id = ? AND password = ?";
    con.query(query, [u_id, password], function (err, result) {
        if (err) {
            console.log("Query error: " + err);
            res.status(500).send("Database error");
            return;
        }

        if (result.length > 0) {
            res.send(`<h2>Welcome ${u_id}</h2>`);
        } else {
            res.redirect('/'); 
        }
    });
});

app.all('/*splat',function(req,res){
   res.send("<h4>Invalid URL......</h4>")
})
 app.listen(9000,function(req,res){
    console.log("Server start at 9000......");
 })