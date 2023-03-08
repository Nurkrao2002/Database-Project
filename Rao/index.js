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

const ejs = require('ejs');

var bodyparser = require("body-parser");

app.use(bodyparser.json());

app.use(bodyparser.urlencoded({ extended:true}));

app.set("view engine","ejs");

app.use(express.static(__dirname + '/students.ejs'));


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

        var postgres = "INSERT INTO public.students(name, email, mno) VALUES('"+name+"', '"+email+"', '"+mno+"')";
          pool.query(postgres,function(error, result){
            if(error) throw error;
            res.send("Student Register Successfully "+result.insertId);
        });
    });
});

app.get("/students",function(req, res, next){
    pool.connect(function(error){
        if(error) console.log(error);

        var postgres = "SELECT * FROM public.students"; 

        pool.query(postgres,function(error, result){
        if(error) console.log(error); 
        // console.log(result);
        res.render(__dirname+"/students", {students: result}); 
        });
    });
});

// module.exports = students;


app.listen(7000, function(){
    console.log("Sever Is Connected....!")
});

// app.listen(3000, function(){
//     console.log("Server is Connected");


