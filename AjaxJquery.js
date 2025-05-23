var mysql = require('mysql2');
var express = require('express');
var app=express();

app.use(express.static('JQuery'));

app.get('/form',function(req,res){
   res.sendFile(__dirname+"/form.html");
})
var con = mysql.createConnection({
   host:"localhost",
   user:"root",
   password:"root@123",
   database:"office"
});

con.connect(function(err){
   if(!err){
      console.log("connected...");
   } else {
      console.log("Not connected....");
   }
})

app.get("/greet",function(req,res){
   const eno = req.query.empno;
   console.log("req received..."+eno);
   const query = "select * from emp where empno = ?";
   con.query(query,[eno],function(err,result){
      if(!err){
         console.log(result.length);
         if(result.length==1){
            res.send("<h1>Welcome "+result[0].ENAME+" </h1>");
         }
         else {
            res.send("<h3>"+eno+" Empno not found </h3>")
         }
      }
   })
})
app.all('/*splat',function(req,res){
   res.send("<h4>Invalid URL......</h4>")
})
 app.listen(9000,function(req,res){
    console.log("Server start at 9000......");
 })