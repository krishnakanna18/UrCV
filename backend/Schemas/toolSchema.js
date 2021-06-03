const  mongoose=require("mongoose");
       fs=require("fs");
       const {connectionUri} =require("../config")

mongoose.connect(connectionUri, {useNewUrlParser: true , useUnifiedTopology: true } );
let toolSchema=new mongoose.Schema({
    tool:String,
    logo:String
})

let Tool=mongoose.model('tools',toolSchema)
module.exports=Tool