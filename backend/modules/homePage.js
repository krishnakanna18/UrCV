const express=require("express");
      subapp=express();
      bodyParser=require("body-parser");
      fetch=require("node-fetch");
      cors=require("cors");
      mongoose=require("mongoose");
      Template=require('./Schemas/templateSchema')      //Template model and functions associated with it
      Website=require("./Schemas/websiteSchema");       //Website model and functions associated with it
      User=require("./Schemas/userSchema")              //User model and functions associated with it
      Tool = require("./Schemas/toolSchema");           //Tool model and functions associated with it

mongoose.connect("mongodb://localhost:27017/UrCV", {useNewUrlParser: true , useUnifiedTopology: true } );

let homePage=async(req,res,next)=>{
    let app=req.app;
    Object.keys(app.locals.settings).forEach((key)=>subapp.set(app.get(key)))
    let user
    if(req.session.loggedin==true){
        user=await User.findOne({username:req.session.username})
    }
}
