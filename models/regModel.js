const mongoose=require("mongoose")
const regSchema=new mongoose.Schema({
name:String,
gmail:String,
password:String,
})
module.exports=mongoose.model("registration",regSchema)
