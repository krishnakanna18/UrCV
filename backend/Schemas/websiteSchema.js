const mongoose=require("mongoose");
const Container = require("./containerSchema");
      fs=require("fs");
      Template=require("./templateSchema")

mongoose.connect("mongodb://localhost:27017/UrCV", {useNewUrlParser: true , useUnifiedTopology: true } )

let webisteSchema=new mongoose.Schema({
    name:{type:String, default:"Site"},
    id:String,
    containers:[{type:mongoose.Schema.Types.ObjectId,ref:'containers'}],
    isDeployed:{type:Boolean,default:false},
    gitlink:String,
    template_id:{type:mongoose.Schema.Types.ObjectId,ref:'templates'},
    createDate:{type: Date, default: Date.now},
    updateDate:{type: Date, default: Date.now}
})

let Website=mongoose.model("websites",webisteSchema)

//Clone the containers in the template recursively and save it to the container database
let makeContainer=async(container)=>{                      
    let new_container=new Container(); 
    new_container={...container.toObject(),_id:new_container._id}
    new_container.children=await Promise.all(container.children.map(async(child)=>await makeContainer(child)))
    await Container.create(new_container,(err,res)=>{
        // console.log(res._id)
    })
    return new_container._id
}

//Clone the template into a new website and save the website
let makeSite=async(id,template=undefined)=>{
    
    let Site=new Website();
    if(template===undefined)
        template=await Template.retrieve(id);
    // Site.template_id=template.id
    Site.containers=await Promise.all(template.containers.map(async(container)=>await makeContainer(container)))
    await Website.create(Site);
    return Site._id
}

//Given the id of a website recursively populate the website and return it
let retrieve=async(id)=>{
    let site=await Website.findById(id)
    site.containers=await Promise.all(site.containers.map(async(container)=>{
        return await Container.retrieve(container._id)
    }))
    return site
}

Website.makeSite=makeSite
Website.retrieve=retrieve
module.exports=Website


