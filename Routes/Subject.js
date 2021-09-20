const mysql = require('mysql');
const express = require('express');
const jwt = require('jsonwebtoken');


const router = express.Router();

// secret 
const jwtPrivateSecret = 'newprivatesecret';

// connect  
const con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root", 
    database: "subject_management"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});



const JwtPrivateSecrt = 'Jay#React';

router.post('/AddSubject',async (req,res) => {
    const name = req.body.name;
    const code = req.body.code;
    const instructor= req.body.insructor;
    const outline= req.body.outline;
    email =req.body.email;
    pass = req.body.password;

    con.query(`SELECT * FROM subject WHERE subject_code = '${code}' `, function(err,result){
        if(err){
            res.send({err:'err'})
        }
        if(result.length === 0){
            var sql = `INSERT INTO subject (subject_name,subject_code,subject_instructor_name,subject_outline) VALUES ('${name}','${code}','${instructor}','${outline}')`
            con.query(sql, function(err,result){
                if(err){ throw err; }
                res.status(200).send({result})
                console.log(result)
            })
        }
        else{
            return res.status(201).send({ message:'subject code is exist'})
        }
    })


})

router.put('/edit/:id' ,(req, res,next ) => {
       const Id = req.params.id;
       const name = req.body.name;
       const code = req.body.code;
       const instructor= req.body.insructor;
       const outline= req.body.outline;  
      
       // updata with mysql
       const Sqql = `UPDATE subject SET subject_name = ${name}, subject_code = '${code}', subject_instructor = '${instructor}', subject_outline = '${outline}' WHERE id = '${Id}'`;
       con.query(Sqql,  function (err, result) {
         if (err) throw err;
         console.log(result.affectedRows + " record(s) updated");
         res.status(200).send({ message:'succsful update' })
       });  
      
     }    
   );


router.get('/GetSubjectData', async (req, res)=> {

  

    email =req.body.email;
    pass = req.body.password;
   
    const thesql = `Select * FROM subject`;
    con.query(thesql,  function (err, result) {
      if (err) throw err;
      if(result.length !==0){
        jwt.sign({UserEmail:email}, JwtPrivateSecrt,
            (err,token) =>{
                res.status(200).send({token:token,result})
            })
    }
    if(result.length ===0){
        res.status(400).send({message:'error not found'})
    }
      //res.send({ result })
    });  //  res.send({ mes: req.headers['authorization']} )
   });

   

  
    router.get('/GetByCode/:id', function (req, res) {
        console.log(req);
        con.query('select * from subject where subject_code=?', [req.params.id], function (error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results));
        });
    });

    router.get('/GetByname/:id', function (req, res) {
        console.log(req);
        con.query('select * from subject where subject_name=?', [req.params.id], function (error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results));
        });
    });


module.exports = router;