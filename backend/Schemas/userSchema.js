const mongoose=require("mongoose")
const Website = require("./websiteSchema")
const {connectionUri} =require("../config")
mongoose.connect(connectionUri, {useNewUrlParser: true , useUnifiedTopology: true } )
let userSchema=new mongoose.Schema({
    name:{type:String,required:true},
    username:{type:String, unique:true, required:true},
    password:{type:String, required:true},
    websites:[{type:mongoose.Schema.Types.ObjectId,ref:'websites',default:[]}],
    gitURL:{type:String,default:"#"}
})

let User=mongoose.model("users",userSchema)

User.populateSites=async(uname)=>{                          //find user by username

    let user=await User.findOne({username:uname})
    user.websites=await Promise.all(user.websites.map(async(website)=>{return await Website.retrieve(website._id)}))
    return user

}

deleteSite=async(uname,id)=>{
    let user=await User.findOne({username:uname})
    let websites=user.websites
    try{
        if(websites.indexOf(id)!==-1){
            websites.splice(websites.indexOf(id),1)
            let newc=await User.findByIdAndUpdate(user._id,{'$set':{websites:websites}},{returnOriginal:false})

        }
    }
catch(e){
    return e
}
}

User.deleteSite=deleteSite
module.exports=User