import React, { Component } from 'react';
import '../../public/css/trial.css'
import '../../public/css/trailc.css'
import Editor from '../Editors/Editor'
import Div from '../TagComponents/Div'
import Img from '../TagComponents/Img'
import P from '../TagComponents/P'
import Span from '../TagComponents/Span'
import Link from '../TagComponents/Link'
// import Perf from 'react-addons-perf'; // ES6
import { Switch } from 'react-router-dom';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";


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
        this.state={template:"",fetched:0,
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
            }
        }
    }

    async componentDidMount(){
        let result=await fetch('http://localhost:9000/template/1')
        let template=await result.json()
        let skillTemplate
        this.setState({template:template,fetched:1},function(){
             skillTemplate=this.search(undefined,"skills");
             for(let i=0; i<skillTemplate.children.length; i++)
             {
                 if(skillTemplate.children[i].children){
                     skillTemplate=skillTemplate.children[i].children[0];
                     break
                 }
    
             }
             this.changeState({models:{skillTemplate}})
             document.querySelector("body").addEventListener("keydown",(e)=>this.changes_stacks_event(e))
            

        })
    }

    undo_change=()=>{
        let undo_stack=[...this.state.changes_stacks.undo_stack]
        let redo_stack=[...this.state.changes_stacks.redo_stack]
        let {redo_top}=this.state.changes_stacks
        // console.log(`${undo_stack}`);
        if(undo_stack.length===0){
            // console.log("Empty stack")
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
            location.href=`#${top.index}`   //Move to the changed element's location
        }
        else{
            console.log("Operation failed");
        }


    }

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
            location.href=`#${top.index}`    //Move to the changed element's location
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

    //Search for an element in the tree                                            
    searchElement=(index,target,template,condition)=>{           //index - the current element's index
                                                       // target- the target index; //template-current tree element
        if(index===target){
            return template
        }

        if(condition!==undefined)
            if(template.classlist.indexOf(condition)>-1)
                return template


        if(template.children.length===0)
            return undefined

        for(let i=0; i< template.children.length; i++){
            let res=this.searchElement(index+`:${i}`,target,template.children[i],condition)
            if(res!==undefined)
                return res  
        }
    }

    //helper function for searching an element given its index
    //Returns the element at index if found or undefined
    search=(index,condition=undefined)=>{                   //Condition - optional for matching conditions
        let template={...this.state.template}
        let result
        for(let i=0; i<template.containers.length; i++){
            result=this.searchElement(`${i}`,index,template.containers[i],condition)
            if(result!==undefined)
                break
        }
        return result

    }

    //Insert an element in the tree
    insertElement=(element,index,parent,template,position,old_value)=>{    //element-element to add ; //index-current element index
                                                        //parent- Parent index of element to add //template-parent
        if(index===parent){
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
             if(this.insertElement(element,index+`:${i}`,parent,{...template.children[i]},position,old_value)===1){
                return 1   
             }
            }

        return 0
    }

    //helper function for inserting an element given its parent id and the element
    insert=(p_id=-1,element,position=-1,stackCall=-1)=>{       //position  -- position to insert in the parent's children array
                                                               //StackCall -- if -1 adds operation to change stack 
                                                               //          -- else(called from undo,redo operations) don't add operation
        // console.log("parent",p_id)
        if(p_id===-1)
            return;
        let template=JSON.parse(JSON.stringify(this.state.template)),undo_stack=[...this.state.changes_stacks.undo_stack]
        let old_value=[];
        // template.containers=[]
        // return 1;
        // for(let i=0; i<template.containers.length; i++)
        let i=p_id.split(":")[0];   //i- index of parent
            if(this.insertElement(element,`${i}`,p_id,{...template.containers[i]},position,old_value)===1){
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
                return 1
            }
        // console.log("INSIDE INSERT")
        return 0;

    }

    //Delete an element recursive 
    //Current - current recursion tree index ; index - index to delete ; 
    //parent - index's parent ; template; current container
    deleteElement=(current,index,parent,template,old_value)=>{
        if(current===parent){
            try{
                old_value.push(template.children[index])            
                template.children.splice(index,1);
                return 1
            }
            catch(err){
                return 0;
            }
        }
        for(let i=0; i< template.children.length; i++)
            if(this.deleteElement(current+`:${i}`,index,parent,template.children[i],old_value)===1)
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
            let old_value=[];
            // for(let i=0; i<template.containers.length; i++)
            let i=pid[0];                   // i - index of parent
                if(this.deleteElement(`${i}`,index,parent,template.containers[i],old_value)===1){
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

                    return 1;
                }
            return 0;
        }
        else{
            index=parseInt(pid[pid.length-1])                //If pid size less than 2 delete the entire container
            try{
                let old_value=[template.containers[index]]
                template.containers.splice(index,1);
                if(stackCall===-1){
                let change_obj={             //Object to log operations
                    undo:{
                        func:this.delete,
                        args:params
                    },
                    redo:{
                        func:this.insert,
                        args:[-1,old_value[0],index]
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
                return 1;
            }
            catch(err){
                return 0;
            }

        }

    }


    //Function for upadting an element in index target with component
    updateElement=(index,target,template,component,move)=>{
        if(index===target){
            if(move!==undefined){
                if(template.children.length>0){
                    let temp=template.children[move.index]
                    template.children[move.index]=template.children[move.index+move.pos]
                    template.children[move.index+move.pos]=temp
                    move.changedIndex=`${index}:${move.index+move.pos}`
                    return 1
                }
            }
            else{
                Object.keys(component).forEach(key=>{
                    if(typeof(component.key)===Object)
                        template[key]={...component[key]}
                    
                    else
                        template[key]=component[key]
                // console.log(template[key],component[key])

                })
                return 1
            }
            return 1
        }

        for(let i=0; i< template.children.length; i++)
            if(this.updateElement(index+`:${i}`,target,template.children[i],component,move)===1)
                return 1 
        return 0
    }

    //Helper function for upaditing the element at index with component  ; Used in updating and moving an element
    //Returns:  Updated template ; move - moveObject in case of moving
    update=(index,component,move=undefined)=>{
        let template=JSON.parse(JSON.stringify(this.state.template))
        for(let i=0; i<template.containers.length; i++){
            if(this.updateElement(`${i}`,index,template.containers[i],component,move)==1)
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
            template=this.update(parent_index,[],moveObj)
            // console.log(this.state.editor.index)
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
            return 1;

        }
        else{
            index=parseInt(pid[pid.length-1]) 
            let temp=template.containers[index]
            template.containers[index]=template.containers[index+pos]
            template.containers[index+pos]=temp
            // console.log(this.state.editor.index)

            this.setState({template:template},()=>{return 1})
        }


    }

    modify=(index,component)=>{
        this.setState({template:this.update(index,component)},()=>{return 1})
    }

    undoDelete=()=>{
        this.undo_change();
        document.getElementById("undoChanges").style.display="none"
    }

    enableEditor=(index,classes)=>{
        let {editor}=this.state
        if(editor.enabled===0 || editor.index!==index || editor.index===index ){
             document.getElementById('editor').style.display="block"
             document.getElementById('site-container').classList.remove('col-lg-10')
             document.getElementById('site-container').classList.add('col-lg-9')
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
            >

            </Editor>
        )

    }

    render() { 
        return ( 
            <React.Fragment> 

                {/* Undo changes button */}
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
                    <div className="col-xl-2 col-lg-3  ml-n2 container-fluid row " style={{display:"none"}} id="editor">
                        <div className="position-fixed col-xl-2 col-lg-3  ml-n2 " style={{overflowY:"scroll",bottom: "0%", top: "52px"}}>
                            {this.state.editor.enabled===1?
                                this.editorDisplay()
                            :""}
                        </div>
                    </div>

                    <div className="col-lg-10 mt-5 col-12 container-fluid" id="site-container">
                        <div className="mt-5 pt-5 container-fluid mb-5 col" id="site" style={{overflowY:"scroll",overflow:"auto"}}>
                            
                            {this.siteDisplay()}
                        </div>
                    </div>
                </div>

        

            </React.Fragment>

         );
    }

    
}


 
export default Template;