var express = require('express');
var router = express.Router();
var upload = require('./multer')
var pool = require('./pool')
/* GET home page. */
router.post('/productdetail_sumbit', upload.single('picture'), function (req, res, next) {
    console.log(req.body)
    console.log(req.file)
    try {
        pool.query("insert into productdetails(categoryid, subcategoryid, brandid, productid, productdetailname, weight, weightType, packagingType, noofqty, stock, price, offerprice, offertype, productstatus, productdetaildescription, created_at, updated_at, user_admin, picture)values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [req.body.categoryid, req.body.subcategoryid, req.body.brandid, req.body.productid, req.body.productdetailname, req.body.weight, req.body.weightType, req.body.packagingType, req.body.noofqty, req.body.stock, req.body.price, req.body.offerprice, req.body.offertype, req.body.productstatus, req.body.productdetaildescription, req.body.created_at, req.body.updated_at, req.body.user_admin, req.file.filename], function (error, result) {
            if (error) {
                console.log(error)
                res.status(500).json({ message: 'Database Error', status: false })
            }
            else {
                res.status(200).json({ message: 'Result Uploaded Successfully', status: true })
            }
        })

    }
    catch (e) {
        res.status(200).json({ message: 'Severe Error', status: false })
    }
});
router.get('/displayall_productd', upload.single('picture'), function (req, res, next) {
    try {
        pool.query("select PD.*,(select C.categoryname from category C where C.categoryid=PD.categoryid) as categoryname,(select SC.subcategoryname from subcategory SC where SC.subcategoryid=PD.subcategoryid) as subcategoryname,(select B.brandname from brand B where B.brandid=PD.brandid) as brandname,(select P.productsname from products P where P.productid=PD.productid) as productname from productdetails PD", function (error, result) {
            if (error) {
                console.log(error)
                res.status(500).json({ message: 'Database Error', status: false })
            }
            else {
                res.status(200).json({ message: 'Success', data: result, status: true })
            }
        })

    }
    catch (e) {
        res.status(200).json({ message: 'Severe Error', status: false })
    }
});
router.post('/getallproductdetailby_productid', function (req, res, next) {
    try {
        pool.query("select PD.*,(select C.categoryname from category C where C.categoryid=PD.categoryid) as categoryname,(select SC.subcategoryname from subcategory SC where SC.subcategoryid=PD.subcategoryid) as subcategoryname,(select B.brandname from brand B where B.brandid=PD.brandid) as brandname,(select P.productsname from products P where P.productid=PD.productid) as productname from productdetails PD where productid=?", [req.body.productid], function (error, result) {
            if (error) {
                console.log(error)
                res.status(200).json({ message: 'Database Error', status: false })
            }
            else {
                res.status(200).json({ message: 'Success', data: result, status: true })
            }
        })

    }
    catch (e) {
        res.status(200).json({ message: 'Severe Error', status: false })
    }
});
router.post('/edit_productdetail', function (req, res, next) {
    try {
        pool.query("update productdetails set categoryid=?, subcategoryid=?, brandid=?, productid=?, productdetailname=?, weight=?, weightType=?, packagingType=?, noofqty=?, stock=?, price=?, offerprice=?, offertype=?, productstatus=?, productdetaildescription=?, updated_at=?, user_admin=? where productdetailid=?", [req.body.categoryid, req.body.subcategoryid, req.body.brandid, req.body.productid, req.body.productdetailname, req.body.weight, req.body.weightType, req.body.packagingType, req.body.noofqty, req.body.stock, req.body.price, req.body.offerprice, req.body.offertype, req.body.productstatus, req.body.productdetaildescription, req.body.updated_at, req.body.user_admin, req.body.productdetailid], function (error, result) {
            if (error) {
                console.log(error)
                res.status(200).json({ message: 'Database Error', status: false })
            }
            else {
                res.status(200).json({ message: 'Result Updated Successfully', status: true })
            }
        })

    }
    catch (e) {
        res.status(200).json({ message: 'Severe Error', status: false })
    }
});
router.post('/edit_picture', upload.single('picture'), function (req, res, next) {
    try {
        pool.query("update productdetails set updated_at=?, user_admin=?,picture=? where productdetailid=?", [req.body.updated_at, req.body.user_admin, req.file.filename, req.body.productdetailid], function (error, result) {
            if (error) {
                console.log(error)
                res.status(200).json({ message: 'Database Error', status: false })
            }
            else {
                res.status(200).json({ message: 'Picture Updated Successfully', status: true })
            }
        })

    }
    catch (e) {
        res.status(200).json({ message: 'Severe Error', status: false })
    }
});
router.post('/delete_data', function (req, res, next) {
    try {
        pool.query("delete from productdetails where productdetailid=?", [req.body.productdetailid], function (error, result) {
            if (error) {
                console.log(error)
                res.status(200).json({ message: 'Database Error', status: false })
            }
            else {
                res.status(200).json({ message: 'Data Deleted Successfully', status: true })
            }
        })

    }
    catch (e) {
        res.status(200).json({ message: 'Severe Error', status: false })
    }
});
module.exports = router;