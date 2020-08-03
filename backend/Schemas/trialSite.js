const mongoose=require("mongoose");
      fs=require("fs");
mongoose.connect("mongodb://localhost:27017/UrCV", {useNewUrlParser: true , useUnifiedTopology: true } );
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
//                     bgImage:String,
//                     img:{
//                         src:String,
//                         classList:[String]
//                     },
//                     Title:{
//                         text:String,
//                         classList:[String]
//                     },
//                     Sub:{
//                         text:String,
//                         classList:[String]
//                     },
//                     Desc:{
//                         text:String,
//                         classList:[String]
//                     },
//                     styles:{
//                         img:[{
//                             property:String,
//                             value:String
//                         }],
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
//             ],
//             breakAfter:Boolean
//         }
//     ],
//     skillset:[{
//         tool:String,
//         logo:String

//     }],
//     isdeployed:Boolean
// })
// let Website=mongoose.model('Websites',websiteSchema);
// let site=new Website({
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

let containerSchema=new mongoose.Schema({
    id:String,
    classlist:{type:[String],default:[]},
    styles:{type:Object},
    tag:{type:String,default:'div'},
    children:[{type:mongoose.Schema.Types.ObjectId,ref:'containers'}],
    contents:{type:Object}

})
let Container=mongoose.model('containers',containerSchema)
let templateSchema=new mongoose.Schema({
    name:String,
    id:String,
    containers:[{type:mongoose.Schema.Types.ObjectId,ref:'containers'}],
    
})
let Template=mongoose.model('templates',templateSchema)

let insert=async(...args)=>{
    // console.log(args);
    let ids=await Promise.all(args.map(async(div)=>{
       return await div.save()
    }))
    // console.log(ids)
    return ids.map((ele)=>ele._id)
   

}
// Container.find({id:{$regex:/^6.*/}},(err,res)=>{
//     if(err)
//         throw err;
//     console.log(res);
// })

let retrieve=async(id)=>{
    let current=await Container.findById(id).populate('children');
    // current.id=str
    // await current.save()
    if(current.children.length==0)
        return current
    current.children=await Promise.all(current.children.map(async(child)=>await retrieve(child._id)))
    return current
}
// let data=fs.readFileSync('siteobjects.js',JSON)
// let comp=JSON.parse(data);
// console.log(comp)

// (async()=>{let test=new Template({
//     name:"Test",
//     id:"test0",
//     containers:[await Container.findOne({id:'0'})._id,await Container.findOne({id:'1'})._id]
// })
// test.save().exec((res)=>{
//     console.log(res)
// })
// })()
// (async()=>{
//     let ids=await Container.find({id:{$in:['0','1']}})
//     console.log([...ids])

//     let test=new Template({
//             name:"Test",
//             id:"test0",
//             containers:ids.map((id)=>id._id)
//         })
//     console.log(await test.save())


// })()
// let func=async()=>{
//     let template=await Template.findOne({id:'test0'})
//     template.containers=await Promise.all(template.containers.map(async(container)=>await retrieve(container._id)))
//     // console.log(template)
//     return template    
// }
// (async()=>{
//     let template=await func()
//     for(let container of template.containers){
//         console.log(container)
//     }
// })()

// (async()=>{
// let result=await Promise.all(comp.map(async(cont)=>await Container.create(cont)))
// })()

// (async function(){
// let classes=""
// classes="img-responsive rounded-circle"
// let div100=new Container({
//     id:'0110',
//     tag:'img',
//     classlist:classes.split(' '),
//     contents:{src:"https://img.stackshare.io/no-img-open-source.png"}
// })

// let div101=new Container({
//     id:'0111',
//     tag:'span',
//     classlist:["mt-2"],
//     contents:{text:"C"}
// })
// classes="mt-4 row  container align-items-center"
// let div10=new Container({
//     id:'011',
//     classlist:classes.split(' '),
//     children:[div100._id,div101._id]
// })
// classes="col-md-3 list-group  mt-md-0 mt-4 col-12 skill-box"
// // let div1=new Container({
// //     id:'01',
// //     classlist:classes.split(' '),
// //     styles:{"background-color": "rgb(107, 173, 165)"},
// //     children:[div10._id]
// // })
// classes="mt-5 pt-5 container-lg container-fluid  d-flex flex-md-row align-items-md-start align-items-center justify-content-around flex-column"
// // let div0=new Container({
// //     id:'0',
// //     classlist:classes.split(' '),
// //     children:[div1._id]
// // })
// id=await insert(div100,div101,div10);
// // Container.findOneAndDelete({id:{$in:['6010','6011','601']}},(err,res)=>{
// //     if(err)
// //         throw err;
// //     else
// //         console.log(res);
// // })

// console.log(id,"THe whole container")

// })()
// Container.find({}).then((res)=>{
//     fs.writeFileSync('siteobjects.js',JSON.stringify(res))

// })
// let file=fs.readFileSync('siteobjects.js',JSON)
// let containers=JSON.parse(file)
// console.log(containers);
// (async()=>{console.log(await retrieve('60'))})()

// (async()=>{
//     let parent=await Container.findOne({id:'1'})
//     result=await retrieve(parent._id,'1')
//     for(let child of result.children)
//         console.log(child.id,child.children)
//     // console.log(root)

// })()




// module.exports=Website;
// "5f1a9817612b3481b198bc64" Site ID in db
Container.find({}).then((res)=>{
    fs.writeFileSync('./website.json',JSON.stringify(res))
})
// let obj={
//     temp:"tempo"
// }
// let data=fs.readFileSync('./siteobjects.js');
// // console.log(JSON.parse(data))
// let containers=JSON.parse(data);
// Container.insertMany(containers,(err,res)=>{
//     if(err)
//         throw err;
//     console.log(res)
// })

// console.log(obj.name)