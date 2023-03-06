// var pool = require("./connection")

// pool.connect(function(error){
//     if(error) throw error;

//     pool.query("select * from studentinfo1", function(error, result){
//         if(error) throw error;
//         console.log(result);
//     })

// });

var pool = require("./connection")
var express = require('express');
const app = express();

var bodyparser = require("body-parser");

app.use(bodyparser.json());

app.use(bodyparser.urlencoded({ extended:true}));

app.get("/", function(req, res){
    res.sendFile(__dirname +"/register.html");

});

app.post("/",function(req, res){    
    // console.log(req.body);
    var name = req.body.name;          
    var email = req.body.email;   
    var mno = req.body.mno;

    pool.connect(function(error){
        if(error) throw error;

        var postgres = "INSERT INTO public.studentinfo1(name, email, mno) VALUES('"+name+"', '"+email+"', '"+mno+"')";
          pool.query(postgres,function(error, result){
            if(error) throw error;
            res.send("Student Register Successfully " +result.insertId);
        });
    });
});

app.listen(7000);


