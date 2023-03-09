var pool = require("./connection")
var express = require('express');
const app = express();

const ejs = require('ejs');

var bodyparser = require("body-parser");

app.use(bodyparser.json());

app.use(bodyparser.urlencoded({ extended:true}));

app.set("view engine","ejs");

app.set('views', './views');

// app.use(express.static(__dirname + '/students.ejs'));


// app.get("/", function(req, res){
//     res.sendFile(__dirname +"/register.html");

// });

// ----------------------------------------------------------------------------

// ----------------------------------------------------------------------------

app.get("/search-students",function(req, res){
    pool.connect(function(error){
        if(error) console.log(error);

        var postgres = "SELECT * FROM public.students"; 

        pool.query(postgres,function(error, result){
        if(error) console.log(error); 
        // console.log(result);
        res.render(__dirname+"/search-students",{students:result.rows});
      

        });
    });
});


// search bar query 

app.get("/search",function(req, res){

    var name = req.query.name;
   
    pool.connect(function(error){
        if(error) console.log(error);

        var postgres = "SELECT * from public.students where name LIKE '%"+name+"%'";
   

        pool.query(postgres,function(error, result){
            if(error) console.log(error);
            res.render(__dirname+"/search-students",{students:result.rows});
        });
    });
});

// ---------------------------------------------------------------------------------------------------

app.listen(7000, function(){
    console.log("Sever Is Connected....!")
});

// app.listen(3000, function(){
//     console.log("Server is Connected");


