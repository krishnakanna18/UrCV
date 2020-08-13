const  mongoose=require("mongoose");
       fs=require("fs");
       Container = require("./containerSchema");

mongoose.connect("mongodb://localhost:27017/UrCV", {useNewUrlParser: true , useUnifiedTopology: true } );

let templateSchema=new mongoose.Schema({
    name:String,
    id:String,
    containers:[{type:mongoose.Schema.Types.ObjectId,ref:'containers'}]
    
})

let Template=mongoose.model('templates',templateSchema)

let retrieve=async(id)=>{
    let template=await Template.findById(id)
    template.containers=await Promise.all(template.containers.map(async(container)=>{
        return await Container.retrieve(container._id)
    }))
    return template
}

// (async()=>{
//     console.log(await retrieve("5f215e4eca32cc5faca29122"))
// })()
Template.retrieve=retrieve
module.exports=Template
