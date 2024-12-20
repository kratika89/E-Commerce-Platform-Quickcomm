var express = require('express');
var router = express.Router();
var upload=require('./multer')
var pool=require('./pool')
/* GET home page. */
router.post('/product_sumbit',upload.single('picture'), function(req, res, next) {
 try{
    pool.query("insert into products(categoryid,subcategoryid,brandid,productsname,productdescription,picture,created_at,updated_at,user_admin)values(?,?,?,?,?,?,?,?,?)",[req.body.categoryid,req.body.subcategoryid,req.body.brandid,req.body.productsname,req.body.productdescription,req.file.filename,req.body.created_at,req.body.updated_at,req.body.user_admin],function(error,result){
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
router.get('/displayall_product',upload.single('picture'), function(req, res, next) {
    try{
       pool.query("select P.*,(select C.categoryname from category C where C.categoryid=P.categoryid) as categoryname ,(select SC.subcategoryname from subcategory SC where SC.subcategoryid=P.subcategoryid) as subcategoryname, (select B.brandname from brand B where B.brandid=P.brandid) as brandname from products P",function(error,result){
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
   router.post('/getallproductby_brand', function(req, res, next) {
    try{
       pool.query("select P.*,(select C.categoryname from category C where C.categoryid=P.categoryid) as categoryname,(select SC.subcategoryname from subcategory SC where SC.subcategoryid=P.subcategoryid) as subcategoryname,(select B.brandname from brand B where B.brandid=P.brandid) as brandname from products P where P.brandid=?",[req.body.brandid],function(error,result){
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
   router.post('/edit_product', function(req, res, next) {
    try{
       pool.query("update products set categoryid=?,subcategoryid=?,brandid=?,productsname=?,productdescription=?,updated_at=?,user_admin=? where productid=?",[req.body.categoryid,req.body.subcategoryid,req.body.brandid,req.body.productsname,req.body.productdescription,req.body.updated_at,req.body.user_admin,req.body.productid],function(error,result){
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
   router.post('/edit_picture',upload.single('picture'), function(req, res, next) {
    try{
       pool.query("update products set picture=?,updated_at=?,user_admin=? where productid=?",[req.file.filename,req.body.updated_at,req.body.user_admin,req.body.productid],function(error,result){
           if(error){
               console.log(error)
               res.status(200).json({message:'Database Error',status:false})
           }
           else{
               res.status(200).json({message:'Picture updated successfully',status:true})
           }
       })
    }
    catch(e){
       res.status(200).json({message:'Severe Error',status:false})
    }
   });
   router.post('/delete_product', function(req, res, next) {
    try{
       pool.query("delete from products where productid=?",[req.body.productid],function(error,result){
           if(error){
               console.log(error)
               res.status(200).json({message:'Database Error',status:false})
           }
           else{
               res.status(200).json({message:'Product deleted successfully',status:true})
           }
       })
    }
    catch(e){
       res.status(200).json({message:'Severe Error',status:false})
    }
   });
module.exports = router;
