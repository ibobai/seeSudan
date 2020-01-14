// init the server
const express = require("express");
const app = express();
const PORT = 5000;
app.listen(PORT, () => console.log("Server is runing on port : "+PORT));

//required lib
const path  = require("path");
const bodyParser = require('body-parser');


//using the HTML body
app.use(bodyParser.urlencoded({ extended: false }))

//setting the view engine
app.set("view-engine","ejs");


//making it dynamic
app.use(express.static(path.join(__dirname,"views")));

//bcrypt test
const bcrypt = require("bcrypt");
const hashPass = bcrypt.hash("ibobai",10);
console.log(hashPass);


//Database
let users = []

//home page
app.get("/", (req,res) => {
    res.render("home.ejs");
});



//register get
app.get("/register",(req,res) => {
    res.render("register.ejs")
  })
  
  //register post
app.post("/register", async (req,res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);                                                                                                                                                                                                                          
    users.push({
      id: Date.now().toString(),
      firstName: req.body.firstName,
      lastNmae: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
      phoneNumber: req.body.phoneNumber,
      gender: req.body.gender,
      country: req.body.country,
  
    })
    res.redirect("login")
})
  
  
  
  
  //login get
app.get("/login",(req,res)=>{
    res.render("login.ejs")
})
  
  //login post 
app.post("/login", (req,res) => {
    // users.forEach(user => {
    //   if(user.email === req.body.email){
    //     if(req.body.password === user.password){
    //       res.send(user.firstName +"<h1> you have Secsseusfully loged in ! </h1>")
    //     } else{
    //       res.send("<h1> Email or password incorrect ! </h1>")
    //     }
    //   }else{
    //     res.send("<h1> User not registered ! </h1>")
  
    //   }
    // });
})
  
  
  //beamember get
app.get("/beamember",(req,res) => {
    res.render("beamember.ejs")
})
  
  //beamember post