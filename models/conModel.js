const mongoose=require("mongoose")
const conSchema=new mongoose.Schema({
name:String,
gmail:String,
comment: String,
})
module.exports=mongoose.model("contact",conSchema)
