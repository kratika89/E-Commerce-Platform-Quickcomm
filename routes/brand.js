var express = require('express');
var router = express.Router();
var upload=require('./multer')
var pool=require('./pool')

router.post('/brand_sumbit',upload.single('brandicon'), function(req, res, next) {
    try{
       pool.query("insert into brand(categoryid,subcategoryid,brandname,brandicon,created_at,updated_at,useradmin)values(?,?,?,?,?,?,?)",[req.body.categoryid,req.body.subcategoryid,req.body.brandname,req.file.filename,req.body.created_at,req.body.updated_at,req.body.useradmin],function(error,result){
        if(error){
            console.log(error)
            res.status(200).json({message:'Database Error',status:false})
        }
        else{
            res.status(200).json({message:'Result uploaded successfully',status:true})
        }
       })
    }
    catch(e){
        res.status(200).json({message:'Severe Error',status:false})
    }
  
});
router.get('/displayall_brand', function(req, res, next) {
    try{
       pool.query("select B.*,(select C.categoryname from category C where C.categoryid=B.categoryid) as categoryname,(select SC.subcategoryname from subcategory SC where SC.subcategoryid=B.subcategoryid) as subcategoryname from brand B",function(error,result){
        if(error){
            console.log(error)
            res.status(200).json({message:'Database Error',status:false})
        }
        else{
            res.status(200).json({message:'Success',data:result,status:true})
        }
       })
    }
    catch(e){
        res.status(200).json({message:'Severe Error',status:false})
    }
  
});
router.post('/getallbrandby_subcat', function(req, res, next) {
    try{
       pool.query("select B.*,(select C.categoryname from category C where C.categoryid=B.categoryid) as categoryname,(select SC.subcategoryname from subcategory SC where SC.subcategoryid=B.subcategoryid) as subcategoryname from brand B where B.subcategoryid=?",[req.body.subcategoryid],function(error,result){
        if(error){
            console.log(error)
            res.status(200).json({message:'Database Error',status:false})
        }
        else{
            res.status(200).json({message:'Success',data:result,status:true})
        }
       })
    }
    catch(e){
        res.status(200).json({message:'Severe Error',status:false})
    }
  
});
router.post('/edit_brand', function(req, res, next) {
    try{
       pool.query("update brand set categoryid=?,subcategoryid=?,brandname=?,updated_at=?,useradmin=? where brandid=?",[req.body.categoryid,req.body.subcategoryid,req.body.brandname,req.body.updated_at,req.body.useradmin,req.body.brandid],function(error,result){
        if(error){
            console.log(error)
            res.status(200).json({message:'Database Error',status:false})
        }
        else{
            res.status(200).json({message:'Result updated successfully',status:true})
        }
       })
    }
    catch(e){
        res.status(200).json({message:'Severe Error',status:false})
    }
  
});
router.post('/edit_brandicon',upload.single('brandicon'), function(req, res, next) {
    try{
       pool.query("update brand set brandicon=?,updated_at=?,useradmin=? where brandid=?",[req.file.filename,req.body.updated_at,req.body.useradmin,req.body.brandid],function(error,result){
        if(error){
            console.log(error)
            res.status(200).json({message:'Database Error',status:false})
        }
        else{
            res.status(200).json({message:'Icon updated successfully',status:true})
        }
       })
    }
    catch(e){
        res.status(200).json({message:'Severe Error',status:false})
    }
  
});
router.post('/delete_brand', function(req, res, next) {
    try{
       pool.query("delete from brand where brandid=?",[req.body.brandid],function(error,result){
        if(error){
            console.log(error)
            res.status(200).json({message:'Database Error',status:false})
        }
        else{
            res.status(200).json({message:'Brand Deleted successfully',status:true})
        }
       })
    }
    catch(e){
        res.status(200).json({message:'Severe Error',status:false})
    }
  
});
module.exports = router;
