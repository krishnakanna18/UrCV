const mongoose=require("mongoose");
      fs=require("fs");
mongoose.connect("mongodb://localhost:27017/UrCV", {useNewUrlParser: true , useUnifiedTopology: true } );

let containerSchema=new mongoose.Schema({
    id:String,
    classlist:{type:[String],default:[]},
    styles:{type:Object,default:undefined},
    tag:{type:String,default:'div'},
    children:[{type:mongoose.Schema.Types.ObjectId,ref:'containers'}],
    contents:{type:Object,default:undefined}

})
let insert=async(...args)=>{
    // console.log(args);
    let ids=await Promise.all(args.map(async(div)=>{
       return await div.save()
    }))
    // console.log(ids)
    return ids.map((ele)=>ele._id)
}


//Recursively populate the children of the containers and return it
let retrieve=async(id)=>{
    let current=await Container.findById(id).populate('children');
    if(current.children.length==0)
        return current
    current.children=await Promise.all(current.children.map(async(child)=>await retrieve(child._id)))
    return current
}


let Container=mongoose.model('containers',containerSchema)
Container.retrieve=retrieve
module.exports=Container