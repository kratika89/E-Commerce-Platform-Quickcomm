var express = require("express");
var router = express.Router();
var pool = require("./pool");

router.post("/userdisplayall_category", function (req, res, next) {
  try {
    if (req.body.status == "all") q = "select * from category";
    else if (req.body.status == "limit") q = "select * from category limit 7";

    pool.query(q, function (error, result) {
      if (error) {
        console.log(error);
        res.status(200).json({
          message: "Database Error pls contact with backend team",
          status: false,
        });
      } else {
        res
          .status(200)
          .json({ message: "Success", data: result, status: true });
      }
    });
  } catch (e) {
    console.log(e);
    res.status(200).json({ message: "Severe Error", status: false });
  }
});
router.get("/userdisplayall_subcategory", function (req, res, next) {
  try {
    pool.query("select * from subcategory", function (error, result) {
      if (error) {
        console.log(error);
        res.status(200).json({
          message: "Database Error pls contact with backend team",
          status: false,
        });
      } else {
        res
          .status(200)
          .json({ message: "Success", data: result, status: true });
      }
    });
  } catch (e) {
    console.log(e);
    res.status(200).json({ message: "Severe Error", status: false });
  }
});
router.post("/getallbrandby_subcat", function (req, res, next) {
  try {
    pool.query(
      "select B.*,(select C.categoryname from category C where C.categoryid=B.categoryid) as categoryname,(select SC.subcategoryname from subcategory SC where SC.subcategoryid=B.subcategoryid) as subcategoryname from brand B where B.subcategoryid=?",
      [req.body.subcategoryid],
      function (error, result) {
        if (error) {
          console.log(error);
          res.status(200).json({ message: "Database Error", status: false });
        } else {
          res
            .status(200)
            .json({ message: "Success", data: result, status: true });
        }
      }
    );
  } catch (e) {
    res.status(200).json({ message: "Severe Error", status: false });
  }
});
router.post("/usergetallsubcatby_catid", function (req, res, next) {
  try {
    pool.query(
      "select SC.*, (select C.categoryname from category C where C.categoryid=SC.categoryid) as categoryname from subcategory SC where SC.categoryid=?",
      [req.body.categoryid],
      function (error, result) {
        if (error) {
          console.log(error);
          res.status(200).json({
            message: "Database Error please contact with backend team",
            status: false,
          });
        } else {
          res
            .status(200)
            .json({ message: "Success", data: result, status: true });
        }
      }
    );
  } catch (e) {
    res.status(200).json({ message: "Severe Error", status: false });
  }
});
router.get("/show_banner", function (req, res, next) {
  try {
    pool.query(
      "select * from mainbanner where status='show' ",
      function (error, result) {
        if (error) {
          console.log(error);
          res.status(200).json({
            message: "Database Error pls contact with backend team",
            status: false,
          });
        } else {
          res
            .status(200)
            .json({ message: "Success", data: result, status: true });
        }
      }
    );
  } catch (e) {
    console.log(e);
    res.status(200).json({ message: "Severe Error", status: false });
  }
});
router.get("/all_adoffers", function (req, res, next) {
  try {
    pool.query("select * from addoffers", function (error, result) {
      if (error) {
        console.log(error);
        res.status(200).json({
          message: "Database Error pls contact with backend team",
          status: false,
        });
      } else {
        res
          .status(200)
          .json({ message: "Success", data: result, status: true });
      }
    });
  } catch (e) {
    console.log(e);
    res.status(200).json({ message: "Severe Error", status: false });
  }
});
router.get("/show_bankoffer", function (req, res, next) {
  try {
    pool.query(
      "select * from bankoffers where status='show' ",
      function (error, result) {
        if (error) {
          console.log(error);
          res.status(200).json({
            message: "Database Error pls contact with backend team",
            status: false,
          });
        } else {
          res
            .status(200)
            .json({ message: "Success", data: result, status: true });
        }
      }
    );
  } catch (e) {
    console.log(e);
    res.status(200).json({ message: "Severe Error", status: false });
  }
});
router.post("/displayall_productdbystatus", function (req, res, next) {
  try {
    pool.query(
      "select PD.*,(select C.categoryname from category C where C.categoryid=PD.categoryid) as categoryname,(select SC.subcategoryname from subcategory SC where SC.subcategoryid=PD.subcategoryid) as subcategoryname,(select B.brandname from brand B where B.brandid=PD.brandid) as brandname,(select P.productsname from products P where P.productid=PD.productid) as productname from productdetails PD where PD.productstatus=?",
      [req.body.productstatus],
      function (error, result) {
        if (error) {
          console.log(error);
          res.status(500).json({ message: "Database Error", status: false });
        } else {
          res
            .status(200)
            .json({ message: "Success", data: result, status: true });
        }
      }
    );
  } catch (e) {
    res.status(200).json({ message: "Severe Error", status: false });
  }
});
router.post(
  "/userdisplayall_productdetails_by_subcategory",
  function (req, res, next) {
    try {
      pool.query(
        "select PD.*,(select C.categoryname from category C where C.categoryid=PD.categoryid) as categoryname,(select SC.subcategoryname from subcategory SC where SC.subcategoryid=PD.subcategoryid) as subcategoryname,(select B.brandname from brand B where B.brandid=PD.brandid) as brandname,(select P.productsname from products P where P.productid=PD.productid) as productname from productdetails PD where PD.subcategoryid=?",
        [req.body.subcategoryid],
        function (error, result) {
          if (error) {
            console.log(error);
            res.status(200).json({
              message: "Database Error pls contact with backend team",
              status: false,
            });
          } else {
            res
              .status(200)
              .json({ message: "Success", data: result, status: true });
          }
        }
      );
    } catch (e) {
      console.log(e);
      res.status(200).json({ message: "Severe Error", status: false });
    }
  }
);

router.post("/user_display_product_details_by_id", function (req, res, next) {
  try {
    console.log("xxxx", req.body);
    pool.query(
      "select PD.*,(select C.categoryname from category C where C.categoryid=PD.categoryid) as categoryname,(select SC.subcategoryname from subcategory SC where SC.subcategoryid=PD.subcategoryid) as subcategoryname,(select B.brandname from brand B where B.brandid=PD.brandid) as brandname,(select P.productsname from products P where P.productid=PD.productid) as productsname  from productdetails PD where PD.productid=?",
      [req.body.productid],
      function (error, result) {
        if (error) {
          console.log(error);
          res.status(200).json({
            message: "Database Error Pls contact with backend team...",
            status: false,
          });
        } else {
          res
            .status(200)
            .json({ message: "Success", data: result, status: true });
        }
      }
    );
  } catch (e) {
    res.status(200).json({
      message: "Severe error on server pls contact with backend team",
      status: false,
    });
  }
});

router.post("/user_display_product_pictures", function (req, res, next) {
  try {
    console.log("xxxx", req.body);
    pool.query(
      "select * from productdetailpicture where productdetailid=?",
      [req.body.productdetailid],
      function (error, result) {
        if (error) {
          console.log(error);
          res.status(200).json({
            message: "Database Error Pls contact with backend team...",
            status: false,
          });
        } else {
          res
            .status(200)
            .json({ message: "Success", data: result, status: true });
        }
      }
    );
  } catch (e) {
    res.status(200).json({
      message: "Severe error on server pls contact with backend team",
      status: false,
    });
  }
});

router.post("/checkusermobile_no", function (req, res, next) {
  try {
    console.log("xxxx", req.body);
    pool.query(
      "select * from usersdata where mobileno=?",
      [req.body.mobileno],
      function (error, result) {
        if (error) {
          console.log(error);
          res.status(500).json({
            message: "Database Error Pls contact with backend team...",
            status: false,
          });
        } else {
          if (result.length == 1) {
            console.log(result)
            res
              .status(200)
              .json({ message: "mobile no exist", data: result[0], status: true });
          } else {
            console.log(result)
            res
              .status(200)
              .json({
                message: "mobile no does not exist",
                data: [],
                status: false,
              });
          }
        }
      }
    );
  } catch (e) {
    res.status(200).json({
      message: "Severe error on server pls contact with backend team",
      status: false,
    });
  }
});



router.post("/sumbit_user_data", function (req, res, next) {
  try {
    pool.query(
      "insert into usersdata( firstname, lastname, gender, emailaddress, dob, mobileno) values (?,?,?,?,?,?)",
      [
        req.body.firstname,
        req.body.lastname,
        req.body.gender,
        req.body.emailaddress,
        req.body.dob,
        req.body.mobileno,
      ],
      function (error, result) {
        if (error) {
          console.log(error);
          res.status(200).json({
            message: "Database Error Pls contact with backend team...",
            status: false,
          });
        } else {
          console.log(result)
          res.status(200).json({ message: "Successfully Registered!", status: true,userid:result.insertId });
        }
      }
    );
  } catch (e) {
    res.status(200).json({
      message: "Severe error on server pls contact with backend team",
      status: false,
    });
  }
});
router.post("/checkuser_address", function (req, res, next) {
  try {
    console.log("xxxx", req.body);
    pool.query(
      "select * from useraddress where userid=?",
      [req.body.userid],
      function (error, result) {
        if (error) {
          console.log(error);
          res.status(500).json({
            message: "Database Error Pls contact with backend team...",
            status: false,
          });
        } else {
          if (result.length >=1) {
            console.log(result)
            res
              .status(200)
              .json({ message: "address found", data: result, status: true });
          } else {
            console.log(result)
            res
              .status(200)
              .json({
                message: "address not found",
                data: [],
                status: false,
              });
          }
        }
      }
    );
  } catch (e) {
    res.status(200).json({
      message: "Severe error on server pls contact with backend team",
      status: false,
    });
  }
});

router.post("/sumbit_address", function (req, res, next) {
  try {
    pool.query(
      "insert into useraddress( userid, pincode, houseno, floorno, towerno, building, address, landmark, city, state) values (?,?,?,?,?,?,?,?,?,?)",
      [
          req.body.userid,  req.body.pincode,  req.body.houseno,  req.body.floorno,  req.body.towerno,  req.body.building,  req.body.address,  req.body.landmark,  req.body.city,  req.body.state
      ],
      function (error, result) {
        if (error) {
          console.log(error);
          res.status(200).json({
            message: "Database Error Pls contact with backend team...",
            status: false,
          });
        } else {
          console.log(result)
          res.status(200).json({ message: "Address Successfully Registered!", status: true,userid:result.insertId });
        }
      }
    );
  } catch (e) {
    res.status(200).json({
      message: "Severe error on server pls contact with backend team",
      status: false,
    });
  }
});
module.exports = router;
