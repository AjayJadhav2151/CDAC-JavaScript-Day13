var exp = require('express');
var mysql = require('mysql2');

var app = exp();

app.use(exp.static("/JQuery"));

app.listen(9000, function(req, res) {
    console.log("port 9000");
})

app.get('/home', function(req, res) {
    res.send("<h1> Welcome to Express </h1><br/><a href='http://localhost:9000/form'> LOGIN </a>");
})

app.get('/form', function(req, res) {
    res.sendFile(__dirname + "/dept.html");
})

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root@123",
    database: "office"
});

con.connect(function(err) {
    if(!err)
        console.log("Connected");
    else
        console.log("Not Connected");
})


app.get('/dept', function(req, res) {
    const deptno = req.query.deptno;
    console.log("dept request received : " + deptno);
    const query = "SELECT * FROM emp WHERE deptno = ?";
    
    con.query(query, [deptno], function(err, result) {
        if(!err) {
            if(result.length > 0) {
                let html = "<h2>Employees in Department " + deptno + "</h2><table border='1'>";
                html += "<tr><th>EMPNO</th><th>ENAME</th><th>JOB</th><th>MGR</th><th>HIREDATE</th><th>SAL</th><th>COMM</th><th>DEPTNO</th></tr>";
                
                result.forEach(emp => {
                    html += `<tr>
                        <td>${emp.EMPNO}</td>
                        <td>${emp.ENAME}</td>
                        <td>${emp.JOB}</td>
                        <td>${emp.MGR}</td>
                        <td>${new Date(emp.HIREDATE).toLocaleDateString()}</td>
                        <td>${emp.SAL}</td>
                        <td>${emp.COMM}</td>
                        <td>${emp.DEPTNO}</td>
                    </tr>`;
                });
                
                html += "</table>";
                res.send(html);
            } else {
                res.send("<h3>No employees found in department " + deptno + "</h3>");
            }
        } else {
            res.send("<h3>Error retrieving department employees</h3>");
        }
    });
});

app.all('/*splat', function(req, res) {
    res.send("<h4> Invalid URL </h4>");
})
