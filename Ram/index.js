var pool = require("./connection")
var express = require('express');
const app = express();
const ejs = require('ejs');

var bodyparser = require("body-parser");

app.use(bodyparser.json());

app.use(bodyparser.urlencoded({ extended:true}));

app.set("view engine","ejs");

// app.use(express.static(__dirname + '/students.ejs'));


// app.get("/", function(req, res){
//     res.sendFile(__dirname +"/register.html");

// });

    // to connect database or else to display not connected database...

pool.connect((err, client, done) => {
  if (err) {
    console.error('', err);
    // Redirect to another page
    app.get('/', (req, res) => {
      res.redirect('/error');
      
    });
  } else {
    console.log('Connected to database');
    // Continue with your application logic
    app.get('/', (req, res) => {
    //   res.render(__dirname +"/search-students.ejs");
    // res.send('database error. Please try again later.....!');
    return res.redirect('/search-students');
    });
  }
});

app.get('/error', (req, res) => {
//   res.send('database error. Please try again later.....!');
//   res.render(__dirname +"/error.ejs");
  // return res.redirect('/error');
  res.render(__dirname +"/error.ejs");
});

// app.get('/search-students', function(request, response) {
//   res.send('database error. Please try again later.....!');
// //   response.render('/search-students.ejs');
// });

// ----------------------------------------------------------------------------------


// to entry the data in database table

// app.post("/register",function(req, res){    
//   // console.log(req.body);
//   var name = req.body.name;          
//   var email = req.body.email;   
//   var mno = req.body.mno;

//   pool.connect(function(error){
//       if(error) throw error;

//       var postgres = "INSERT INTO public.students(name, email, mno) VALUES('"+name+"', '"+email+"', '"+mno+"')";
//         pool.query(postgres,function(error, result){
//           if(error) throw error;
//           res.send("Student Register Successfully "+result.insertId);
//       });
//   });
// });

// app.get('/register', (req, res) => {
//     res.send('database error. Please try again later.....!');
//     // res.render(__filename +"/register.html");
//     // return res.redirect('/error');
//   });




// to display data in search-students 

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
    console.log("Sever Is Connected....at port no - 7000!")
});