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
    Site.template_id=id
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


//Delete containers from a website
let deleteContainer=async(id,site)=>{
    try{
        let result=await Container.deleteContainer(id)
        let web=await Website.findById(site)
        let {containers}=web
        containers.splice(containers.indexOf(id),1);
        let newc=await Website.findByIdAndUpdate(site,{'$set':{containers:containers}},{returnOriginal:false})
        return newc
  }
  catch(e){
        return e
  }
}


//Move containers from a website
let moveContainer=async(id,index,pos,site)=>{
    try{
        let web=await Website.findById(site)
        let {containers}=web
        let temp=containers[index]
        containers[index]=containers[index+pos]
        containers[index+pos]=temp
        let newc=await Website.findByIdAndUpdate(site,{'$set':{containers:containers}},{returnOriginal:false})
        return newc
    }
    catch(e){
        return e
    }
}

//Insert a container in a website
let insertContainer=async(component,position,site)=>{
    try{
        let newContainer=await Container.addContainers(component)
        let web=await Website.findById(site)
        let {containers}=web
        containers.splice(position,0,newContainer)
        let newc=await Website.findByIdAndUpdate(site,{'$set':{containers:containers}},{returnOriginal:false})
        return newContainer
    }
    catch(e){
        return e
    }
}


//Update a website last modified date
let updateModifiedDate=async(site)=>{
    let web=await Website.findById(site)
    let date=Date.now()
    let newc=await Website.findByIdAndUpdate(site,{'$set':{updateDate:date}},{returnOriginal:false})

}

//Delete an entire site
let deleteSite=async(id)=>{
    try{
         let web=await Website.findById(id)
         await Promise.all(web.containers.map(async(container)=>{
            let result=await Container.deleteContainer(container)
         }))
         await Website.findByIdAndDelete(id)

    }
    catch(e){
        return e
    }

}

//Converts a given component to html
let convertToHtml=(component)=>{

    if(component===undefined || component===null) return ``;
    if(component.children && component.children.length===0)
        {
            let element=document.createElement()
        }


}


//Convert the website from db into html
let convertSiteToHtml=async(id)=>{

    let site=await retrieve(id)
    let html_start=`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${site.name}</title>
    </head>
    <body>`,
    html_end=`</body>
    </html>`

    let html_content=[]
    for(let container of site.containers){
        html_content.push(convertToHtml(container))
    }

}


//Push the files to the user repo
let pushToRepo=(file,access_token,content,message)=>{

    return fetch(file,{
        method:"get"
    })
    .then(resp=>resp.json())
    .then(resp=>{
            let body={
                message:`${message}`,
                content:`${Buffer.from(content).toString('base64')}`
            }
            if(resp.sha!==undefined || resp.sha!==null)
                        body.sha=resp.sha
            fetch(file,{
                method:"put",
                headers:{'Authorization':`token ${access_token}`,
                accept:"application/vnd.github.v3+json"},
                body:JSON.stringify(body),
                })
            .then(response=>{
                console.log(response.status)
                return response.json()
            })
            .then(res=>{
                // console.log(res)
            })
    })

}

Website.makeSite=makeSite
Website.retrieve=retrieve
Website.deleteContainer=deleteContainer
Website.moveContainer=moveContainer
Website.insertContainer=insertContainer
Website.updateModifiedDate=updateModifiedDate
Website.deleteSite=deleteSite
Website.pushToRepo=pushToRepo
module.exports=Website


