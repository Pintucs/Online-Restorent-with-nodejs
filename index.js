const express = require("express")
const app = express()

var bodyParser = require('body-parser')
const PORT=process.env.PORT || 4000
require("./db/config")
const User = require("./models/regModel")
const Contact = require("./models/conModel")

const cors = require("cors")
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.urlencoded({extended:true}));
app.use(express.json())
app.use(bodyParser.json())


//api for display register ("http://localhost:4000/showData")
app.get("/showData",async(r,s)=>{
    let user = await User.find()
    if (user.length > 0) {
                s.send(user)
    } else {
        s.send({ result: "No Data found" })
    }
})

// api for display contact data ("http://localhost:4000/showcontactdata")
app.get("/showcontactdata",async(r,s)=>{
    let user = await Contact.find()
    if (user.length > 0) {
                s.send(user)
    } else {
        s.send({ result: "No Data found" })
    }
})

// post api for register ("http://localhost:4000/registration")
app.post("/registration", async (r, s) => {
    const user = new User(r.body)
    const result = await user.save()
    s.send(result)
})

// post api for contact ("http://localhost:4000/contect")
app.post("/contact", async (r, s) => {
    const user = new Contact(r.body)
    const result = await user.save()
    s.send(result)
})

// delete api for user ("http://localhost:4000/user/:id")
app.delete("/user/:id", async (req, res) => {
      const result = await User.deleteOne({ _id: req.params.id });
      res.send(result);
  });

// delete api for contact ("http://localhost:4000/contact/:id")
app.delete("/contact/:id", async (req, res) => {
      const result = await Contact.deleteOne({ _id: req.params.id });
      res.send(result);
  });

// get api for user using id ("http://localhost:4000/user/:id")
app.get("/user/:id", async (r, s) => {
    let result = await User.findOne({ _id: r.params.id })
    if (result) {
        s.send(result)
    } else {
        s.send({ result: "no record found" })
    }
})

// update api for user ("http://localhost:4000/user/:id")
app.put("/user/:id", async (r, s) => {
    let result = await User.updateOne({ _id: r.params.id }, { $set: r.body })
    s.send(result)
})


//initial api ("http://localhost:4000/")
app.get("/", (r, s) => {
    s.send("my node working now... ")
})

app.listen(PORT)