import React, { Component } from 'react';
import '../css/trial.css'
import '../css/trailc.css'
import Editor from '../Editors/Editor'
import Div from '../TagComponents/Div'
import Img from '../TagComponents/Img'
import P from '../TagComponents/P'
import Span from '../TagComponents/Span'
import Link from '../TagComponents/Link'
import { withRouter } from 'react-router-dom'
import Button from '@material-ui/core'
import EditorMenu from '../Components/editorMenu'
import {serverEndPoint} from '../config'
// import * as ImgToBase64 from 'img-to-base64';

//Convert the css style object to react style object
// Perf.start()
let styleParser=(styles)=>{
    let temp={}
    Object.keys(styles).map((style)=>{
         let strings=style.split('-')
         let first=strings[0]
         strings=strings.slice(1,strings.length).map((string)=>{
             return string.charAt(0).toUpperCase() + string.slice(1)
         })
         strings=[first,...strings]
         strings=strings.join('')
         temp={...temp,[strings]:styles[style]}
        
         
     })
    return temp
 }




class Template extends Component {
    constructor(){
        super();
        this.state={template:"",fetched:0, user:{},
        editor:{
            enabled:false,
            index:"",
            type:""
            },
        models:{                               //Sample Schemas
            skillTemplate:"",
            projectTemplate:""
            },
        changes_stacks:{            //Stack to store the changes made
            undo_stack:[],          //Stores the undo operations triggered by ctrl+z
            redo_stack:[],           //Stores the undo operations triggered by ctrl+y
            stack_element_index:"",  //Store the stack element index
            undo_top:"",
            redo_top:""
            },
        siteId:"",
        templateModelId:"",
        name:""
        
        },
        this.elementRef = React.createRef(),
        this.jsonToHtml=this.jsonToHtml.bind(this)
    }

    // shouldComponentUpdate=(props,state)=>{
    //     if(props.loggedin===false){     //If the user logs out when the editor component is open
    //     props.history.push({
    //         pathname:'/'
    //     })
    //     return 0
    // }
    // return 1
    
    // }



    jsonToHtml=(component)=>{

        if(component.styles)
            component.styles=styleParser(component.styles)
        if(component.classlist!==undefined)
        component.classlist=`${component.classlist.join(' ')}`
        if(component.tag==="div")
            return(<div style={component.styles} className={component.classlist}>
                        {component.children!==null && component.children!==undefined?
                            component.children.map(child=>this.jsonToHtml(child))
                        :""}
                    </div>)
        if(component.tag==="p")
            return(<p style={component.styles} className={component.classlist}>
                  {component.contents.text}
                {component.children!==null && component.children!==undefined?
                    component.children.map(child=>this.jsonToHtml(child))
                :""}
            </p>)
        if(component.tag==="span")
            return(<span style={component.styles} className={component.classlist}>
                {component.contents.text}
            </span>)
        if(component.tag==="img" || component.tag==="image")
          return(<img style={component.styles} className={component.classlist} src={component.contents.src}>
          </img>)
        
    
    }


    removePublishBtn=()=>{

        if(this.props.loggedin===0 || this.props.loggedin===false){  //Go to home if the user has logged out
            let btn=document.getElementById("publishBtn")
            let btn2=document.getElementById("downloadBtn")

            if(btn)
                btn.remove()

            if(btn2!==null)
                btn2.remove()
            this.props.history.push({
                pathname:'/'
            })
        }
    }

    getBase64Image=(imgUrl, callback)=> {

        var img = new Image();
    
        // onload fires when the image is fully loadded, and has width and height
    
        img.onload = function(){
    
          var canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          var ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);
          var dataURL=canvas.toDataURL()
    
          callback(dataURL); // the base64 string
    
        };
    
        // set attributes and src 
        img.setAttribute('crossOrigin', 'anonymous'); //
        img.src = imgUrl;
    }




    //Download the website as PDF
    downloadPdf=async()=>{
        let source=document.getElementById('site')
        let pdf = new jsPDF('p', 'pt', 'a4');
        let images=source.getElementsByTagName('img')
        for(let node of images){        //Fetch all images from the local server
            if(node.getAttribute('src').match(/^http:/g)){
                let data=await fetch(node.getAttribute('src'),{
                    method:"get",
                    credentials:"include"
                })
                    data=await data.blob()
                    let reader = new FileReader() ;
                    reader.onload = function(){ 
                        node.setAttribute('src',this.result)
                    } 
                    reader.readAsDataURL(data) ;
            }
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
        }
        let name=this.state.name
        pdf.addHTML(source,function() {
            pdf.save(name+'.pdf');
        });
    }

    async componentDidMount(){

        let tempId,user;
        try{
        tempId=this.props.location.state.id;
            user=this.props.location.state.user
        }
        catch(e){
            this.props.history.push({
                pathname:'/'
            })

        }

        if(tempId===undefined || tempId===null)
        {
            tempId=localStorage.getItem("tempId");
            user=JSON.parse(localStorage.getItem("user"))
        }

        let template=await fetch(`${serverEndPoint}/website/`+tempId,{
            method:"GET",
            credentials:"include"
        })
        template=await template.json()

        let templateModelId
        if(template!==undefined || template!==null)
            templateModelId=template.website.template_id
        else
            templateModelId=""

        let skillTemplate
        this.setState({template:template.website,fetched:1,user:user,siteId:tempId,templateModelId,name:template.website.name},function(){
            try{
             skillTemplate=this.search(undefined,"skills");
             for(let i=0; i<skillTemplate.children.length; i++)
             {
                 if(skillTemplate.children[i].children){
                     for(let skill of skillTemplate.children[i].children){
                            if(skill){
                                skillTemplate=skill;
                                break;
                            }
                     }
                 }
             }
            }
            catch(e){
                // console.log(e)
            }
             this.changeState({models:{skillTemplate}})
             document.querySelector("body").addEventListener("keydown",(e)=>this.changes_stacks_event(e))
        })

   

    }


    getAccessTokenGit=async()=>{
        console.log("Getting Access Token from git....");
        window.open(`${serverEndPoint}/publish/code?siteID=`+this.state.siteId,'_blank');
        // window.location.href=`${serverEndPoint}/publish/code?siteID=`+this.state.siteId
    }



    componentWillUnmount=()=>{
        let btn=document.getElementById("publishBtn")
        let btn2=document.getElementById("downloadBtn")

        
        if(btn!=null)
            btn.remove()

        if(btn2!=null)
            btn2.remove()
     
       window.removeEventListener('beforeunload', this.removePublishBtn);
        
    }

    undo_change=()=>{
        let undo_stack=[...this.state.changes_stacks.undo_stack]
        let redo_stack=[...this.state.changes_stacks.redo_stack]
        let {redo_top}=this.state.changes_stacks
        // console.log(`${undo_stack.length}`);
        if(undo_stack.length===0){
            console.log("Empty stack")
            // this.setState({changes_stacks:{undo_stack,redo_stack,undo_top:"",redo_top}})
            return;
        }
        let top=undo_stack.pop();
        let topUndo=top.undo;
        // console.log("Top ->",topUndo)
        // console.log(`TOp index ${top.index}`);
        if(topUndo.func.apply(this,[...topUndo.args,0])===1){
            redo_stack.push(top);
            // console.log("Changes->",changes_stacks)
            let changes_stacks={undo_stack,redo_stack,redo_top,undo_top:`${top.index}`}
            // console.log(`Top index is ${top.index}`);
            this.setState({changes_stacks})
              //Move to the changed element's location
        }
        else{
            console.log("Operation failed");
        }


    }

    // componentWillUnmount(){
    //     console.log("Unmounted Editor")
    // }

    redo_change=()=>{

        let undo_stack=[...this.state.changes_stacks.undo_stack]
        let redo_stack=[...this.state.changes_stacks.redo_stack]
        let {undo_top}=this.state.changes_stacks
        if(redo_stack.length===0){
            console.log("Empty stack")
            // this.setState({changes_stacks:{undo_stack,redo_stack,undo_top,redo_top:""}})
            return;
        }
        let top=redo_stack.pop();
        let topRedo=top.redo;
        // console.log("Top ->",topRedo)
        // console.log(`Redo index ${top.index}`);
        if(topRedo.func.apply(this,[...topRedo.args,0])===1){
            undo_stack.push(top);
            // console.log("Changes->",changes_stacks)
            let changes_stacks={undo_stack,redo_stack,undo_top,redo_top:`${top.index}`}
            this.setState({changes_stacks})
                //Move to the changed element's location
        }
        else{
            console.log("Operation failed");
        }


    }

    changes_stacks_event=(event)=>{
        if(event.ctrlKey && event.key === 'z'){
            // console.log("Undo")
            this.undo_change();
        }
        else if(event.ctrlKey && event.key === 'y'){
            // console.log("Redo")
            this.redo_change();
        }


    }

    changeState=(obj)=>{
        this.setState({...obj},function(){
        })


    }
    
    tree(container,index){
        // if(container.children!==undefined)
        //      container.children=container.children.map((child,id)=>this.tree(child,index+`${id}`))
        // console.log(container.styles)
        if(container.styles)
            container.styles=styleParser(container.styles)
        if(container.tag==="div")
          return(  
            <Div index={`${index}`} key={`${index}`} styles={container.styles} classes={container.classlist}
                 enableEditor={this.enableEditor}  editorIndex={this.state.editor.index} 
                 child_containers={container.children}
                 undoIndex={this.state.changes_stacks.undo_top}
                 redoIndex={this.state.changes_stacks.redo_top}
                 >             
                {container.children.map((child,id)=>this.tree(child,index+`:${id}`))}
            </Div>
          )
        else if(container.tag==="img" || container.tag==="image" )
          return(  
            <Img index={`${index}`} key={`${index}`} styles={container.styles}  classes={container.classlist} contents={container.contents} 
            >
                {container.children.map((child,id)=>this.tree(child,index+`:${id}`))}
            </Img>
          )
        else if(container.tag==="p" )
          return(  
            <P index={`${index}`} key={`${index}`} styles={container.styles}  classes={container.classlist} contents={container.contents} 
            >
    
                {container.children.map((child,id)=>this.tree(child,index+`:${id}`))}
            </P>
          )
        else if(container.tag==="span" )
        return(  
          <Span index={`${index}`} key={`${index}`}  styles={container.styles} classes={container.classlist} contents={container.contents} 
                >
              {container.children.map((child,id)=>this.tree(child,index+`:${id}`))}
          </Span>
        )
        else if(container.tag==="a" )
        return(  
          <Link index={`${index}`} key={`${index}`}  styles={container.styles} classes={container.classlist} contents={container.contents} >
              {container.children.map((child,id)=>this.tree(child,index+`:${id}`))}
          </Link>
        )
        else if(container.tag==="br")
            return <br key={`${index}`}></br>
    
    }

    siteDisplay(){
        let template=this.state.template
        // console.log(template,"Render")
        if(this.state.fetched===1){
            return(
                <React.Fragment>
                    {template.containers.map((container,index)=>this.tree(container,index))}
                </React.Fragment>
            )
        }
        else{
            //Loading page goes here

        }

    }

    addId=()=>{

    }

    //Search for an element in the tree                                            
    searchElement=(index,target,template,condition,dbid=undefined)=>{           //index - the current element's index
                                                       // target- the target index; //template-current tree element
        if(index===target){
            if(dbid!==undefined)
                dbid.id=template._id
            return template
        }

        if(condition!==undefined)
            if(template.classlist.indexOf(condition)>-1)
                return template


        if(template.children.length===0)
            return undefined

        for(let i=0; i< template.children.length; i++){
            let res=this.searchElement(index+`:${i}`,target,template.children[i],condition,dbid)
            if(res!==undefined)
                return res  
        }
    }

    //helper function for searching an element given its index
    //Returns the element at index if found or undefined
    search=(index,condition=undefined,dbid=undefined)=>{                   //Condition - optional for matching conditions
        let template={...this.state.template}
        let result
        for(let i=0; i<template.containers.length; i++){
            result=this.searchElement(`${i}`,index,template.containers[i],condition,dbid)
            if(result!==undefined)
                break
        }
        return result

    }

    //Insert an element in the tree
    insertElement=(element,index,parent,template,position,old_value,dbid)=>{    //element-element to add ; //index-current element index
                                                        //parent- Parent index of element to add //template-parent
        if(index===parent){
            if(dbid!==undefined)
                dbid.id=template._id
            if(position===-1){
                template.children.push(element)
                old_value.push(`${index}:${template.children.length-1}`)
            }
            else{
                template.children.splice(position,0,element)
                old_value.push(`${index}:${position}`)
            }
            return 1
        }

        for(let i=0; i< template.children.length; i++){
             if(this.insertElement(element,index+`:${i}`,parent,{...template.children[i]},position,old_value,dbid)===1){
                return 1   
             }
            }

        return 0
    }

    //helper function for inserting an element given its parent id and the element
    insert=(p_id=-1,element,position=-1,stackCall=-1)=>{       //position  -- position to insert in the parent's children array
                                                               //StackCall -- if -1 adds operation to change stack 
                                                               //          -- else(called from undo,redo operations) don't add operation
        console.log("parent",p_id)

        let template=JSON.parse(JSON.stringify(this.state.template)),undo_stack=[...this.state.changes_stacks.undo_stack]
        let old_value=[],dbid={p_id:""}
        if(p_id===-1)   
        {   
            fetch(`${serverEndPoint}/website/container/insert`,{
                method:"post",
                credentials:"include",
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({
                    p_id:-1,
                    component: element,
                    position:position,
                    isFull:true,
                    site:this.state.siteId
                })
            })
            .then(res=>res.json())
            .then(async(res)=>{
                let comp=await fetch(`${serverEndPoint}/website/container/retrieve/`+res.id,{
                    method:"get",
                    credentials:"include",
                })
                comp=await comp.json()
                comp=comp.container
                if(position===-1){
                    template.containers.push(comp)
                    position=template.containers.length-1
                }
                else
                    template.containers.splice(position,0,comp)
                if(stackCall===-1){
                    let change_obj={             //Object to log operations
                        undo:{
                            func:this.delete,
                            args:[position]
                        },
                        redo:{
                            func:this.insert,
                            args:[p_id,element,position]
                            
                        },
                        index:`${p_id}`
                    }
                    undo_stack.push(change_obj)
                }
                this.setState({template,changes_stacks:{undo_stack:undo_stack,redo_stack:this.state.changes_stacks.redo_stack}},()=>{return 1})
                return 1
            })
            return 1;
        }
        this.search(p_id,undefined,dbid)
        let i=p_id.split(":")[0];   //i- index of parent
        fetch(`${serverEndPoint}/website/container/insert`,{
            method:"post",
            credentials:"include",
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                p_id:dbid.id,
                component: element,
                position:position,
                isFull:false,
                site:this.state.siteId
            })
        })
        .then(res=>res.json())
        .then(async(res)=>{
            let comp=await fetch(`${serverEndPoint}/website/container/retrieve/`+res.id,{
                method:"get",
                credentials:"include",
            })
            comp=await comp.json()
            comp=comp.container
            if(this.insertElement(comp,`${i}`,p_id,{...template.containers[i]},position,old_value,dbid)===1){
                if(stackCall===-1){
                let change_obj={             //Object to log operations
                    undo:{
                        func:this.delete,
                        args:old_value
                    },
                    redo:{
                        func:this.insert,
                        args:[p_id,element,position]
                        
                    },
                    index:`${i}`
                }
                undo_stack.push(change_obj)
            }
                this.setState({template,changes_stacks:{undo_stack:undo_stack,redo_stack:this.state.changes_stacks.redo_stack}},()=>{return 1})
                //Procedure to post data to server -- post the new container to the server. 
                //                                 -- post the new container's id to the parent and send to the server.
                return 1
            }

        })
        // console.log("INSIDE INSERT")
        return 1;

    }

    //Delete an element recursive 
    //Current - current recursion tree index ; index - index to delete ; 
    //parent - index's parent ; template; current container
    deleteElement=(current,index,parent,template,old_value,dbid)=>{
        if(current===parent){
            try{
                old_value.push(template.children[index]) 
                if(dbid!==undefined) 
                    dbid.id=template.children[index]._id
                template.children.splice(index,1);
                return 1
            }
            catch(err){
                console.log(err)
                return 0;
            }
        }
        for(let i=0; i< template.children.length; i++)
            if(this.deleteElement(current+`:${i}`,index,parent,template.children[i],old_value,dbid)===1)
                return 1 
        return 0

    }

    //Helper function for deleting an element given its index in the tree ;
    //Returns: 1 if deleted successfully 0 if not
    delete=(index,stackCall=-1)=>{          //StackCall -- if -1 adds operation to change stack 
                                            //          -- else(called from undo,redo operations) don't add operation
        let params=[index]
        let template=JSON.parse(JSON.stringify(this.state.template)),undo_stack=[...this.state.changes_stacks.undo_stack]
        // let before_update=JSON.parse(JSON.stringify(this.state.template))
        let pid=index.split(':'),parent;                          //Split the index to get its element's parent
        if(pid.length>=2){
            
            parent=pid.slice(0,pid.length-1).join(':')            //Retrieve the parent index by joining till the second last
            index=parseInt(pid[pid.length-1])                     //The index to delete
            let old_value=[],dbid={id:""}                         //Dbid is used to retrieve the _id of the container in the database
            // for(let i=0; i<template.containers.length; i++)
            let i=pid[0];                   // i - index of parent
                if(this.deleteElement(`${i}`,index,parent,template.containers[i],old_value,dbid)===1){
                    if(stackCall===-1){
                    let change_obj={             //Object to log operations
                        undo:{
                            func:this.insert,
                            args:[parent,old_value[0],index]
                        },
                        redo:{
                            func:this.delete,
                            args:params
                            
                        },
                        index:`${pid[0]}`
                    }
                    undo_stack.push(change_obj)
                }

                    this.setState({template,changes_stacks:{undo_stack:undo_stack,redo_stack:this.state.changes_stacks.redo_stack}}),
                        setTimeout(()=>{
                        
                        let undo=document.getElementById("undoChanges")
                        undo.style.display="block"
                        undo.style.backgroundColor="black"

                        setTimeout(()=>{
                            undo.style.display="none"
                        },4000)
                    },500);

                   fetch(`${serverEndPoint}/website/container/delete`,{
                       method:"delete",
                       credentials:"include",
                       headers:{'Content-Type':'application/json'},
                       body:JSON.stringify({id:dbid.id, isFull:false, site:this.state.siteId})
                   })
                   .then((res)=>{
                       return res.json()
                   })
                   .then((res)=>{
                   })
                   .catch(e=>{
                       console.log(e)
                   })

                    return 1;
                }
            return 1;
        }
        else{
            index=parseInt(pid[pid.length-1])                //If pid size less than 2 delete the entire container
            let id=template.containers[index]._id
            try{
                let old_value=[JSON.parse(JSON.stringify(template.containers[index]))]
                template.containers.splice(index,1);
                if(stackCall===-1){
                let change_obj={             //Object to log operations
                    undo:{
                        func:this.insert,
                        args:[-1,old_value[0],index]
                    },
                    redo:{
                        func:this.delete,
                        args:params
                    },
                    index:`${pid[0]}`
                }
                undo_stack.push(change_obj)
            }
                this.setState({template:template,changes_stacks:{undo_stack:undo_stack,redo_stack:this.state.changes_stacks.redo_stack}},()=>{
                    let undo=document.getElementById("undoChanges")
                        undo.style.display="block"
                        undo.style.backgroundColor="black"
                        setTimeout(()=>{
                            undo.style.display="none"
                        },4000)
                })
                fetch(`${serverEndPoint}/website/container/delete`,{
                    method:"delete",
                    credentials:"include",
                    headers:{'Content-Type':'application/json'},
                    body:JSON.stringify({id:id, site:this.state.siteId,isFull:true})
                })
                .then((res)=>{
                    return res.json()
                })
                .then((res)=>{
                })
                .catch(e=>{
                    console.log(e)
                })


                return 1;
            }
            catch(err){
                return 0;
            }

        }

    }


    //Function for upadting an element in index target with component
    updateElement=(index,target,template,component,move,old_val=undefined,dbid)=>{
        if(index===target){
            if(move!==undefined){
                if(template.children.length>0){
                    let temp=template.children[move.index]
                    if(dbid!==undefined)
                        dbid.id=template._id           //Set the id of the old db element
               
                    template.children[move.index]=template.children[move.index+move.pos]
                    template.children[move.index+move.pos]=temp
                    move.changedIndex=`${index}:${move.index+move.pos}`
                    return 1
                }
            }
            else{
                old_val.val=JSON.parse(JSON.stringify(template))
                if(dbid!==undefined)
                    dbid.id=template._id
                // console.log("Old value",old_val.val,"New",component)
                Object.keys(component).forEach(key=>{
                    if(typeof(component.key)===Object)
                        template[key]={...component[key]}
                    else
                        template[key]=component[key]
                // console.log(template[key],component[key])
                })
                dbid.modified=JSON.parse(JSON.stringify(template))
                return 1
            }
            return 1
        }

        for(let i=0; i< template.children.length; i++)
            if(this.updateElement(index+`:${i}`,target,template.children[i],component,move,old_val,dbid)===1)
                return 1 
        return 0
    }

    //Helper function for upaditing the element at index with component  ; Used in updating and moving an element
    //Returns:  Updated template ; move - moveObject in case of moving
    update=(index,component,move=undefined,old_val=undefined,dbid)=>{
        let template=JSON.parse(JSON.stringify(this.state.template))
        for(let i=0; i<template.containers.length; i++){
            if(this.updateElement(`${i}`,index,template.containers[i],component,move,old_val,dbid)==1)
                return template   
        }
        
        return template

    }


    //Move element at index by pos
    move=(index,pos,stackCall=-1)=>{
        // console.log(index)
        let params=[index,pos]
        let template=JSON.parse(JSON.stringify(this.state.template)),undo_stack=[...this.state.changes_stacks.undo_stack]
        let pid=index.split(':'),parent;  
        if(pid.length>=2){
            let parent_index=pid.slice(0,pid.length-1).join(':')
            index=parseInt(pid[pid.length-1])
            // console.log(index)
            let moveObj={index:index,pos:pos}                    //Describe the update object
            let dbid={id:"",index:index,pos:pos}
            template=this.update(parent_index,[],moveObj,undefined,dbid)
            if(stackCall===-1){
                let change_obj={             //Object to log operations
                    undo:{
                        func:this.move,
                        args:[moveObj.changedIndex,-pos]
                    },
                    redo:{
                        func:this.move,
                        args:params
                        
                    },
                    index:`${pid[0]}`
                }
                undo_stack.push(change_obj)
            }
            this.setState({template,changes_stacks:{undo_stack:undo_stack,redo_stack:this.state.changes_stacks.redo_stack}},()=>{return 1})
            fetch(`${serverEndPoint}/website/container/move`,{
                method:"put",
                credentials:"include",
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({
                    id:dbid.id,
                    index:dbid.index,
                    pos:dbid.pos,
                    isFull:false,
                    site:this.state.siteId
                })

            })
            .then(res=>res.json())
            .then(res=>{
            })
            .catch(e=>{
                console.log(e)
            })

            return 1;

        }
        else{
            index=parseInt(pid[pid.length-1]) 
            let id=template.containers[index]._id
            if(index===0 && pos===-1 || index===template.containers.length-1 && pos===1)
                return false;
            let temp=JSON.parse(JSON.stringify(template.containers[index]))
            template.containers[index]=JSON.parse(JSON.stringify(template.containers[index+pos]))
            template.containers[index+pos]=temp
            if(stackCall===-1){
                let change_obj={             //Object to log operations
                    undo:{
                        func:this.move,
                        args:[String(parseInt(index)+pos),-pos]
                    },
                    redo:{
                        func:this.move,
                        args:[String(index),pos]
                    },
                    index:`${index}`
                }
                undo_stack.push(change_obj)
            }
            this.setState({template:template,changes_stacks:{undo_stack:undo_stack,redo_stack:this.state.changes_stacks.redo_stack}},()=>{return 1})
            fetch(`${serverEndPoint}/website/container/move`,{
                method:"put",
                credentials:"include",
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({
                    id:id,
                    index:index,
                    pos:pos,
                    isFull:true,
                    site:this.state.siteId
                })

            })
            .then(res=>res.json())
            .then(res=>{
            })
            .catch(e=>{
                console.log(e)
            })
            return 1 
        }


    }

    //Modify a given container -- used primarily for text components and image components
    modify=(index,component,stackCall=-1)=>{
        let params=[index,JSON.parse(JSON.stringify(component))]
        let old_val={val:{}},undo_stack=[...this.state.changes_stacks.undo_stack]
        let dbid={id:"",modified:{}}                         //Dbid is used to retrieve the _id of the container in the database
        let modifiedTemp=this.update(index,component,undefined,old_val,dbid);
        if(stackCall===-1){
            let change_obj={
                undo:{
                    func:this.modify,
                    args:[index,old_val.val]
                },
                redo:{
                    func:this.modify,
                    args:params
                },
                index:index
            }
            undo_stack.push(change_obj)
        }
        this.setState({template:modifiedTemp,changes_stacks:{undo_stack:undo_stack,redo_stack:this.state.changes_stacks.redo_stack}},()=>{return 1})

        fetch(`${serverEndPoint}/website/container/modify`,{
            method:"put",
            credentials:"include",
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({id:dbid.id, component:dbid.modified,site:this.state.siteId})
        })
        .then((res)=>{
            return res.json()
        })
        .then((res)=>{
        })
        .catch(e=>{
            console.log(e)
        })
        return 1;
    }

    undoDelete=()=>{
        this.undo_change();
        document.getElementById("undoChanges").style.display="none"
    }

    enableEditor=(index,classes)=>{
        let {editor}=this.state
        if(editor.enabled===0 || editor.index!==index || editor.index===index ){
             document.getElementById('editor').style.display="block"
             let cont=document.getElementById('site-container')
             cont.classList.remove('col-lg-10')
             cont.classList.add('col-lg-9')
             cont.style.float="right"
             this.setState({editor:{enabled:1,index:`${index}`,type:classes}})
            }

        else if(editor.enabled===1 ){
            document.getElementById('editor').style.display="none"
            document.getElementById('site-container').classList.add('col-lg-10')
            document.getElementById('site-container').classList.remove('col-lg-9')
            this.setState({editor:{enabled:0,index:"",type:""}})
           }
        // this.addContainer()
    }

    disableEditor=()=>{
        document.getElementById('editor').style.display="none"
        document.getElementById('site-container').classList.add('col-lg-10')
        document.getElementById('site-container').classList.remove('col-lg-9')
        this.setState({editor:{enabled:0,index:"",type:""}})

    }

    editorDisplay(){

       let {editor,editor:{type}}=this.state;

       let editorType
       if(type.includes('skills'))
            editorType="skills"
       else if(type.includes('menu'))
            editorType="menu"
       else if(type.includes('project'))
            editorType="project"
       else 
            editorType="container"

        let editorComponent=this.search(editor.index)
        // console.log(editorComponent)

        return(
            <Editor index={`${editor.index}`} 
                    component={editorComponent} 
                    type={editorType} 
                    disableEditor={this.disableEditor} 
                    delete={this.delete}
                    move={this.move}
                    insert={this.insert}
                    models={this.state.models}
                    modify={this.modify}
                    templateModelId={this.state.templateModelId}
                    jsonToHtml={this.jsonToHtml}
            >

            </Editor>
        )

    }

    render() { 
        let loggedin=this.props.loggedin
        // if(localStorage.getItem("loggedin")==="true") loggedin=true

        if(loggedin===0 || loggedin===false){  //Go to home if the user has logged out
            this.removePublishBtn()
        }
        return ( 
            <React.Fragment > 

                {/* Undo changes button */}
                <EditorMenu loggedin={this.props.loggedin} user={this.props.location.state.user} logoutUser={this.props.logoutUser} download={this.downloadPdf} deploy={this.getAccessTokenGit}></EditorMenu>
                <div id="undoChanges"  style={{display:"none"}} className="container">
                    <div className="position-fixed d-flex flex-column pt-3 pb-3 pr-3 pl-3" id="undoInner" style={{top:"20%",bottom:"50%",right:"0",backgroundColor:"black",zIndex:3,height:"14%"}}>
                        <p className="" style={{color:"white",fontSize:"medium"}}>
                            You removed an element
                        </p>
                        <div className=" d-flex flex-row justify-content-between" >
                            <button className="btn btn-light " 
                                onClick={this.undoDelete}
                            >
                                Undo
                            </button>
                            <button className="btn btn-light" 
                                    onClick={()=>{
                                        let undo=document.getElementById("undoChanges")
                                        undo.style.display="none"
                                    }}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>

                <div className="d-flex flex-lg-row flex-column">
                    <div className="ml-n2 container-fluid row " id="editorScroll" style={{display:"none", width:"20%"}} id="editor">
                        <div className="position-fixed col ml-n2 " style={{overflowY:"scroll",bottom: "0%", top: "52px", border:"2px solid white",width:"20%"}}>
                            {this.state.editor.enabled===1?
                                this.editorDisplay()
                            :""}
                        </div>
                    </div>

                    <div className="col-lg-10 mt-5  col-12 container-fluid" id="site-container" style={{width:"100%"}}>
                        <div className="mt-2 pt-5 container-fluid mb-5 col" id="site" style={{overflowY:"scroll",overflow:"auto"}}>
                            {this.siteDisplay()}
                        </div>
                    </div>
                </div>

        

            </React.Fragment>

         );
    }

    
}


 
export default withRouter(Template);



// var source=document.getElementById('root')
// var pdf = new jsPDF('p','pt','a4');

// //    pdf.addHTML(document.body,function() {
// //     var string = pdf.output('datauristring');
// //     // $('.preview-pane').attr('src', string);
// //     var c=document.getElementsByClassName('preview-pane')
// //     console.log(c)
// //     c[0].setAttribute("src",string)
// //     });
// margins = {
//     width: 1000
// };
// pdf.fromHTML(
// source,
// margins.left,
// margins.top, {
//     'width': margins.width, // max width of content on PDF
// },
// function (dispose) {
//     // dispose: object with X, Y of the last line add to the PDF 
//     //          this allow the insertion of new lines after html
//     pdf.save('Test.pdf');
// }, margins);