const { pool } = require('pg')
 
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '1234',
  port: 5432,
});

module.exports = pool;
 
// pool.query('SELECT * FROM public.studentinfo1', (err, res) => {
//   console.log(err, res)
//   pool.end()
//   console.log("database is connected")
// })

// pool.connect(function(error){
//     if(error) throw error;
//     // console.log("connected to database");

//     pool.query("SELECT * FROM studentdata",function(error, result){
//         if(error) throw error;
//         console.log(result);
//     });
// });
 
