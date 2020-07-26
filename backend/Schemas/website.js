const mongoose=require("mongoose");
const fs=require('fs')
mongoose.connect("mongodb://localhost:27017/UrCV", {useNewUrlParser: true , useUnifiedTopology: true } );
let tools=new mongoose.Schema({
    tool:String,
    logo:String
})
let Tool=mongoose.model("Tools",tools)
// let info=fs.readFileSync('/home/krishna/Documents/UrCV/backend/Schemas/tools.json',JSON);
// let datas=JSON.parse(info);
// for(let data of datas){
//     Tool.create(data,(err,res)=>{
//         if(err)
//             throw err;
//         console.log(res)
//     })
// }
Tool.find({},(err,res,fields)=>{
    console.log(res.length);
})

// let websiteSchema=new mongoose.Schema({
//     avatar:String,
//     wbname:String,
//     template:{
//         tname:String,
//         tid:String
//     },
//     menu:[
//         {
//             title:String,
//             href:String,
//             classList:[String],
//             icon:String
//         }
//     ],
//     footer:[
//         {
//             title:String,
//             href:String,
//             classList:[String],
//             icon:String
//         }
//     ],
//     Containers:[
//         {
//             container_id:Number,
//             bgImage:String,
//             container_name:String,
//             container_type:{type:String,default:undefined},
//             container_location:{type:String,default:"#"},
//             classList:[String],
//             Inner:[
//                 {
//                     component_id:Number,
//                     classList:[String],
//                     img:{type:String,default:undefined},
//                     Title:String,
//                     Sub:{type:String,default:undefined},
//                     Desc:String,
//                     styles:{
//                         Title: [{
//                             property: String,
//                             value:String
//                         }],
//                         Sub: [{
//                             property: String,
//                             value:String

//                         }],
//                         Desc: [{
//                             property: String,
//                             value:String

//                         }]
//                     }    
//                 }
//             ]
//         }
//     ],
//     isdeployed:Boolean
// })
// let Website=mongoose.model('Websites',websiteSchema);
// Website.create({
//     avatar:"http://seanhalpin.io/assets/img/content/home/hello/me.svg",
//     wbname:"test",
//     template:{
//         tname:"Sean Halpin",
//         tid:"0"
//     },
//     menu:[
//         {
//             title:"About",
//             href:"#1",
//             classList:["nav-link"]
//         },
//         {
//             title:"Projects",
//             href:"/porjects.html",
//             classList:["nav-link"]

//         },
//         {
//             title:"Skills",
//             href:"#3",
//             classList:["nav-link"]
//         },
//         {
//             title:"Contact",
//             href:"#5",
//             classList:["nav-link"]
//         }
//     ],
//     footer:[
//         {
//             title:"twitter",
//             href:"https://twitter.com/",
//             classList:["nav-link"]

//         },
//         {
//             title:"reddit",
//             href:"https://www.reddit.com/",
//             classList:["nav-link"]

//         },
//         {
//             title:"quora",
//             href:"https://www.quora.com/profile/Krishna-Kanna-1",
//             classList:["nav-link"]
//         }
//     ],
//     Containers:[
//         {
//             container_id:0,
//             classList:[""],
//             bgImage:"#45b29a",
//             container_location:"#",
//             container_type:"div",
//             Inner:[
//                 {
                    
//                 }
//             ]

//         },
//         {
//             container_id:0,
//             container_name:"topcontainer",
//             container_location:"#",
//             container_type:"div",
//             bgImage:"https://html.nkdev.info/skylith/assets/images/screenshot-demo-minimal-classic-agency.jpg",
//             Inner:[
//                 {
//                     component_id:1,
//                     Title:"Create Your beautiful Website with skylith",
//                     Sub:"30+ Unique Designs Offered",
//                     classList:["justify-content-center", "d-flex", "flex-cloumn"],
//                     style:{
//                         Title:[
//                             {
//                                 "font-size":"100px",
//                                 "font-family":"Times New Roman"
//                             }

//                         ]
                        
//                     }

                    
//                 },
//                 {
//                     component_id:2,
//                     img:"https://html.nkdev.info/skylith/assets/images/promo-header-demos.png",
//                     classList:["justify-content-center", "d-flex", "flex-cloumn"]

//                 }
//             ]
//         },
//         {
//             container_id:1,
//             container_name:"midcontainer",
//             container_location:"#",
//             container_type:"row",
//             classList:["d-flex container-fluid "],
//             Inner:[
//                 {
//                     component_id:0,
//                     Sub:"BBBBAAD!",
//                     classList:["col-lg-4 col-md-6 col-sm-12"],
//                     img:"https://html.nkdev.info/skylith/assets/images/screenshot-demo-minimal-classic-agency.jpg"
//                 },
//                 {
//                     component_id:1,
//                     Sub:"BBBBAAD!",
//                     classList:["col-lg-4 col-md-6 col-sm-12"],
//                     img:"https://html.nkdev.info/skylith/assets/images/screenshot-demo-dark-creative-agency.jpg"
//                 },
//                 {
//                     component_id:2,
//                     Sub:"BBBBAAD!",
//                     classList:["col-lg-4 col-md-6 col-sm-12"],
//                     img:"https://html.nkdev.info/skylith/assets/images/screenshot-demo-minimal-carousel-portfolio.jpg"
//                 }
//             ]
//         }
//     ]
// },(err,res)=>{
//     if(err)
//         throw err;
//     else
//         console.log(res);
// })
// module.exports=Website;
// "5f1a9817612b3481b198bc64" Site ID in db
// "5f1d3678d1df2fc168e83d7a"