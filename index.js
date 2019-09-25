const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});
app.post("/", function(req, res) {
  var fName = req.body.fName;
  var lName = req.body.lName;
  var email = req.body.email;

  var data = {
    members: [
      {
        email_address: email,
        merge_fields: {
          FNAME: fName,
          LNAME: lName
        },
        status: "subscribed"
      }
    ]
  };
  jsonData = JSON.stringify(data);

  var option = {
    url: "https://us20.api.mailchimp.com/3.0/lists/9efb90be0d",
    method: "POST",
    headers: {
      Authorization: "adeebAhmad ca09672f6dbf80f23f2235dfe2f15177-us20"
    },
    body: jsonData
  };
  request(option, function(error, response, body) {
    if (error) {
      res.sendFile(__dirname + "/failure.html");
      console.log(error)
    } else {
      if ((response.statusCode === 200)) {
        res.sendFile(__dirname + "/success.html");
      } else {
        res.sendFile(__dirname + "/failure.html");
      }
    }
  });
});

app.post('/failure' , function (req,res) {  
    res.redirect('/');
})

app.listen(process.env.PORT || 3000, function() {
  console.log(`Server is running on port '3000'.`);
});

// 9efb90be0d
//!   ca09672f6dbf80f23f2235dfe2f15177-us20
