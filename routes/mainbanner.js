var express = require('express');
var router = express.Router();
var upload= require('./multer')
var pool=require ('./pool')

/* GET home page. */
router.post('/mainbanner_sumbit',upload.any(), function(req, res, next) {
    var f=[]
    req.files.map((item)=>{
        f.push(item.filename)
    })
  try{
    pool.query("insert into mainbanner( status, filenames)values(?,?)",[req.body.status,f+""],function(error,result){
        if(error){
            console.log(error)
            res.status(200).json({message:'Database Error',status:false})
        }
        else{
            res.status(200).json({message:'Result Uploaded Successfully',status:true})
        }
    })

  }
  catch(e){
    res.status(200).json({message:'Severe Error',status:false})
  }
});

module.exports = router;
