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
      res.sendFile(__dirname +"/register.html");
    });
  }
});

app.get('/error', (req, res) => {
  // res.send('database error. Please try again later.....!');
  res.render(__dirname +"/error.ejs");
  // return res.redirect('/error');
});

// app.get('/error', function(request, response) {
  // res.send('database error. Please try again later.....!');
  // response.render('/error.ejs');
// });

// ----------------------------------------------------------------------------------


// to entry the data in database table

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

// ----------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------


app.listen(7000, () => {
  console.log('Server is running on port 7000');
});
