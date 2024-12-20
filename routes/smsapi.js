var express = require("express");
var router = express.Router();
var request = require("request");
var nodemailer = require("nodemailer");
router.post("/sendotp", function (req, res) {
  console.log("API YES", req.body);
  var options = {
    method: "GET",
    url: "http://167.114.117.218/GatewayAPI/rest",
    qs: {
      loginid: "VIKSDIWS",
      password: "nis123@@",
      msg: req.body.otp,

      send_to: req.body.mobileno,

      senderId: "DEMOOS",
      routeId: "8",
      snsContentType: "english",
    },
    headers: {
      "Cache-Control": "no-cache",
    },
  };

  console.log("options:", options);
  request(options, function (error, result, body) {
    if (error) {
      console.log(error);
      return res.json({
        result: false,
      });
    } else {
      console.log(result);
      return res.json({
        result: true,
      });
    }
  });
});

router.post("/sendmail", function (req, res) {
  console.log(req.body);
  var transporter = nodemailer.createTransport({
    // service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "myaditya558@gmail.com",
      pass: "Aditya67@",
    },
  });

  var mailOptions = {
    from: "myaditya558@gmail.com",
    to: req.body.to,
    subject: req.body.subject,
    html: req.body.message,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
  next();
});

module.exports = router;
