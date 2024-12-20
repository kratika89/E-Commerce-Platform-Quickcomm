var express = require('express')
var router = express.Router();
var pool = require('./pool')
var upload = require('./multer')

router.post('/subcategory_sumbit', upload.single('subcategoryicon'), function (req, res, next) {
    try {
        pool.query("insert into subcategory(categoryid,subcategoryname,subcategoryicon,created_at,updated_at,useradmin)values(?,?,?,?,?,?)", [req.body.categoryid, req.body.subcategoryname, req.file.filename, req.body.created_at, req.body.updated_at, req.body.useradmin], function (error, result) {
            if (error) {
                console.log(error)
                res.status(200).json({ message: 'Database Error please contact with backend team', status: false })
            }
            else {
                res.status(200).json({ message: 'Result Uploaded Successfully', status: true })
            }
        })
    }
    catch (e) {
        res.status(200).json({ message: 'Severe Error', status: false })
    }
})
router.get('/display_subcategory', function (req, res, next) {
    try {
        pool.query("select SC.*, (select C.categoryname from category C where C.categoryid=SC.categoryid) as categoryname from subcategory SC", function (error, result) {
            if (error) {
                console.log(error)
                res.status(200).json({ message: 'Database Error please contact with backend team', status: false })
            }
            else {
                res.status(200).json({ message: 'Success', data: result, status: true })
            }
        })
    }
    catch (e) {
        res.status(200).json({ message: 'Severe Error', status: false })
    }
})
router.post('/getallsubcatby_catid', function (req, res, next) {
    console.log("qqqqq",req.body.categoryid)
    try {
        pool.query("select SC.*, (select C.categoryname from category C where C.categoryid=SC.categoryid) as categoryname from subcategory SC where SC.categoryid=?", [req.body.categoryid], function (error, result) {
            if (error) {
                console.log(error)
                res.status(500).json({ message: 'Database Error please contact with backend team', status: false })
            }
            else {
                res.status(200).json({ message: 'Success', data: result, status: true })
            }
        })
    }
    catch (e) {
        res.status(200).json({ message: 'Severe Error', status: false })
    }
})
router.post('/edit_subcategory', function (req, res, next) {
    try {
        pool.query("update subcategory set categoryid=?,subcategoryname=?,updated_at=?,useradmin=? where subcategoryid=?", [req.body.categoryid, req.body.subcategoryname, req.body.updated_at, req.body.useradmin, req.body.subcategoryid], function (error, result) {
            if (error) {
                console.log(error)
                res.status(200).json({ message: 'Database Error please contact with backend team', status: false })
            }
            else {
                res.status(200).json({ message: 'Record Updated Successfully', status: true })
            }
        })
    }
    catch (e) {
        res.status(200).json({ message: 'Severe Error', status: false })
    }
})
router.post('/edit_subcategory_icon', upload.single('subcategoryicon'), function (req, res, next) {
    try {
        pool.query("update subcategory set subcategoryicon=?,updated_at=?,useradmin=? where subcategoryid=?", [req.file.filename, req.body.updated_at, req.body.useradmin, req.body.subcategoryid], function (error, result) {
            if (error) {
                console.log(error)
                res.status(200).json({ message: 'Database Error please contact with backend team', status: false })
            }
            else {
                res.status(200).json({ message: 'Record Updated Successfully', status: true })
            }
        })
    }
    catch (e) {
        res.status(200).json({ message: 'Severe Error', status: false })
    }
})
router.post('/delete_subcategory', function (req, res, next) {
    try {
        pool.query("delete from subcategory where subcategoryid=?", [req.body.subcategoryid], function (error, result) {
            if (error) {
                console.log(error)
                res.status(200).json({ message: 'Database Error please contact with backend team', status: false })
            }
            else {
                res.status(200).json({ message: 'Record Deleted Successfully', status: true })
            }
        })
    }
    catch (e) {
        res.status(200).json({ message: 'Severe Error', status: false })
    }
})
module.exports = router