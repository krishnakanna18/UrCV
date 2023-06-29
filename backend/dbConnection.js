const   mongoose=require("mongoose");
const {connectionUri}=require("./config")
try{
    mongoose.connect(connectionUri, {useNewUrlParser: true , useUnifiedTopology: true } ,()=>{
          console.log("Connected to db.")
      } );
    }
    catch(e){console.log(e)}

module.exports=mongoose
