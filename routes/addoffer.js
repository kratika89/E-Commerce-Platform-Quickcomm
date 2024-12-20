var express = require('express');
var router = express.Router();
var upload= require ("./multer")
var pool=require ("./pool")
/* GET home page. */
router.post('/addoffers_sumbit',upload.any() ,function(req, res, next) {
  var f=[]
  req.files.map((item)=>{
    f.push(item.filename)
  })
  try{
    pool.query("insert into addoffers(categoryid, subcategoryid, brandid, productid, productdetailid, filenames)values(?,?,?,?,?,?)",[ req.body.categoryid, req.body.subcategoryid, req.body.brandid, req.body.productid, req.body.productdetailid, f+""],function(error,result){
       if(error){
        console.log(error)
        res.status(200).json({message:'Database Error',status:false})
       }
       else{
        res.status(200).json({message:'Result Submitted Successfully',status:true})
       }
    })
  }
  catch(e){
    res.status(200).json({message:'Severe Error',status:false})
  }
});

module.exports = router;