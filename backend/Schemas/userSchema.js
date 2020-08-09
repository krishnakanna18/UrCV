const mongoose=require("mongoose")
mongoose.connect("mongodb://localhost:27017/UrCV", {useNewUrlParser: true , useUnifiedTopology: true } )
let userSchema=new mongoose.Schema({
    name:String,
    username:String,
    password:String,
    website:{type:mongoose.Schema.Types.ObjectId,ref:'websites'}
})

let User=mongoose.model("users",userSchema)
module.exports=User