const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");


const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function (req,res) {
    res.sendFile(__dirname+"/signuo.html");
    
});

app.post("/", function (req,res) {
    const firstName = req.body.firstname;
    const lastName = req.body.lastname;
    const email =req.body.email;
    // console.log( name, email ); 
   const data ={
    members : [
        {
        email_address: email,
        status:"subscribed",
        merge_fields: {
            FNAME: firstName,
            LNAME: lastName

        }

    }]
   };
   const jsonData = JSON.stringify(data);
   const url = "https://us21.api.mailchimp.com/3.0/lists/6222587c67";
   const options ={
    method: "POST",
    auth:"Mohd:0257d6753701db83612ed3136e3b6ec1-us21"
   };

  const request =  https.request(url, options, function (response) {
    if(response.statusCode === 200){
        res.sendFile(__dirname+"/success.html");

    }else{
        res.sendFile(__dirname+"/failure.html");
    }
    response.on("data", function(data){
        console.log(JSON.parse(data));
    });
   });
    request.write(jsonData);
    request.end();
});

app.post("/failure", function (req, res) {
    res.redirect("/");
    
});

app.listen( process.env.PORT || 3000, function () {
    console.log("Mohd server is started on port 3000");
})

//api key : 0257d6753701db83612ed3136e3b6ec1-us21
//heroku key: 7514cb7f-3177-40bc-b22e-cb751ff21f4a