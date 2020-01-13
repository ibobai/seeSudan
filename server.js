const express = require("express")
const app = express()
const PORT = process.env.PORT || 5000
const bodyParser = require('body-parser');
const path = require("path")
const bcrypt = require("bcrypt")
const initializedPassport = require("./passport-config")
const passport = require("passport")
initializedPassport(passport)


app.listen(PORT,()=> console.log("The app in running in port : "+PORT))


app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname,"views")))//to the files dynamique


//Database
let users = []


//set the view engine
app.set("view-engine","ejs")



//home
app.get("/",(req,res) =>{
    res.render("home.ejs")
})


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