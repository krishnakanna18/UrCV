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
let retrieve=async(id,deploy=undefined)=>{
    let site=await Website.findById(id)
    site.containers=await Promise.all(site.containers.map(async(container)=>{
        return await Container.retrieve(container._id,deploy)
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



//Deploy all the three files at the same time in the repository
let bruteDeploy=(html,css,js,access_token,file)=>{
    // /repos/:owner/:repo/commits/master
    return fetch(file+"index.html",{        //Check if index.html is present in the repo
        method:"get",
        headers:{"Accept": "application/vnd.github.v3+json"}
    })
    .then(resp=>resp.json())
    .then(resp=>{
            let body={
                message:`Index HTML`,
                content:`${Buffer.from(html).toString('base64')}`
            }
            if(resp.sha!==undefined || resp.sha!==null)     //If index.html is present add the sha of the previous commit
                        body.sha=resp.sha
            fetch(file+"index.html",{
                method:"put",
                headers:{'Authorization':`token ${access_token}`,
                "Accept":"application/vnd.github.v3+json"},
                body:JSON.stringify(body),
                })
            .then(response=>{
                console.log(response.status)
                return response.json()
            })
            .then(res=>{
                fetch(file+"index.js",{                 //Get the sha of the previous commit
                    method:"get"
                })
                .then(resp=>resp.json())
                .then(resp=>{
                        let body={
                            message:`Index JS`,
                            content:`${Buffer.from(js).toString('base64')}`
                        }
                        if(resp.sha!==undefined || resp.sha!==null)
                                    body.sha=resp.sha
                        fetch(file+"index.js",{
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
                            fetch(file+"index.css",{
                                method:"get"
                            })
                            .then(resp=>resp.json())
                            .then(resp=>{
                                    let body={
                                        message:`Index CSS`,
                                        content:`${Buffer.from(css).toString('base64')}`
                                    }
                                    if(resp.sha!==undefined || resp.sha!==null)
                                                body.sha=resp.sha
                                    fetch(file+"index.css",{
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
                                    })
                            })
                        })
                })
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
Website.bruteDeploy=bruteDeploy
module.exports=Website



//For converting url image to base64
// if(node.getAttribute('src').match(/^http:/g)){
//     let data=await fetch(node.getAttribute('src'),{
//         method:"get",
//         credentials:"include"
//     })
//         data=await data.blob()
//         let reader = new FileReader() ;
//         reader.onload = function(){ 
//             node.setAttribute('src',this.result)
//         } 
//         reader.readAsDataURL(data) ;
// }
// else if(node.getAttribute('src').match(/^https:/g)){
//     let data=await fetch(node.getAttribute('src'),{
//         method:"get",
//         headers:{'Access-Control-Allow-Origin':'*'},
//         mode:"no-cors"
//     })

//     data=await data.blob()
//     let reader = new FileReader() ;
//     reader.onload = function(){ 
//         node.setAttribute('src',this.result)

//     } 
//     reader.readAsDataURL(data) ;
// }