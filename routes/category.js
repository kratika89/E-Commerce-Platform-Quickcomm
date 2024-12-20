var express=require('express')
var router=express.Router();
var upload=require('./multer')
var pool=require('./pool')

router.post('/category_sumbit',upload.single('categoryicon'),function(req,res,next){
    try{

        pool.query("insert into category(categoryname,categoryicon,created_date,updated_date,user_admin)values(?,?,?,?,?)",[req.body.categoryname,req.file.filename,req.body.created_date,req.body.updated_date,req.body.user_admin],function(error,result){
            if(error){
                console.log(error)
             res.status(200).json({message:'Database Error pls contact with backend team',status:false  })   
            }
            else{

                res.status(200).json({message:'Record Submitted Successfully',status:true})     
            }

        })
    }
    catch(e){
        console.log(e)
           res.status(200).json({message:'Severe Error',status:false })   
    }
})


router.get('/displayall_category',function(req,res,next){
    try{

        pool.query("select * from category",function(error,result){
            if(error){
                console.log(error)
             res.status(200).json({message:'Database Error pls contact with backend team',status:false  })   
            }
            else{

                res.status(200).json({message:'Success',data:result,status:true})     
            }

        })
    }
    catch(e){
        console.log(e)
           res.status(200).json({message:'Severe Error',status:false })   
    }
})
router.post('/edit_category',function(req,res,next){
    try{

        pool.query("update category set categoryname=?,updated_date=?,user_admin=? where categoryid=?",[req.body.categoryname,req.body.updated_date,req.body.user_admin,req.body.categoryid],function(error,result){
            if(error){
                console.log(error)
             res.status(200).json({message:'Database Error pls contact with backend team',status:false  })   
            }
            else{

                res.status(200).json({message:'Record updated Successfully',status:true})     
            }

        })
    }
    catch(e){
        console.log(e)
           res.status(200).json({message:'Severe Error',status:false })   
    }
})
router.post('/edit_category_icon',upload.single('categoryicon'),function(req,res,next){
    try{

        pool.query("update category set categoryicon=?,updated_date=?,user_admin=? where categoryid=?",[req.file.filename,req.body.updated_date,req.body.user_admin,req.body.categoryid],function(error,result){
            if(error){
                console.log(error)
             res.status(200).json({message:'Database Error pls contact with backend team',status:false  })   
            }
            else{

                res.status(200).json({message:'Record updated Successfully',status:true})     
            }

        })
    }
    catch(e){
        console.log(e)
           res.status(200).json({message:'Severe Error',status:false })   
    }
})
router.post('/delete_category',function(req,res,next){
    try{

        pool.query("delete from category where categoryid=?",[req.body.categoryid],function(error,result){
            if(error){
                console.log(error)
             res.status(200).json({message:'Database Error pls contact with backend team',status:false  })   
            }
            else{

                res.status(200).json({message:'Record deleted Successfully',status:true})     
            }

        })
    }
    catch(e){
        console.log(e)
           res.status(200).json({message:'Severe Error',status:false })   
    }
})
module.exports=router