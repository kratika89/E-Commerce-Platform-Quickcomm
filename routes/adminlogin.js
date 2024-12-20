var express = require('express');
var router = express.Router();
var upload= require ("./multer")
var pool=require ("./pool")
/* GET home page. */
router.post('/chkadminlogin' ,function(req, res, next) {
  
  try{
    pool.query(" select * from admins where (emailid=? or mobileno=?) and password=?",[ req.body.emailid, req.body.emailid, req.body.password],function(error,result){
       if(error){
        console.log(error)
        res.status(200).json({message:'Database Error',status:false})
       }
       else{
       if(result.length==1)
       {
        res.status(200).json({message:'Success',status:true})
       }
       else{
        res.status(200).json({message:'Invalid Emailid/Password',status:false})
       }
       }
    })
  }
  catch(e){
    res.status(200).json({message:'Severe Error',status:false})
  }
});

module.exports = router;