import React, { Component } from 'react';
import '../../public/trial.css'
import Editor from '../Editors/Editor'
import Div from '../TagComponents/Div'
import Img from '../TagComponents/Img'
import P from '../TagComponents/P'
import Span from '../TagComponents/Span'
import Link from '../TagComponents/Link'

class Template extends Component {
    constructor(){
        super();
        this.state={template:"",fetched:0,
        editor:{
            enabled:false,
            index:"",
            type:""
        }}
    }

    async componentDidMount(){
        let result=await fetch('http://localhost:9000/template/1')
        let template=await result.json()
        this.setState({template:template,fetched:1})
    }

    tree(container,index){
        // if(container.children!==undefined)
        //      container.children=container.children.map((child,id)=>this.tree(child,index+`${id}`))
        // console.log(container.styles)
        if(container.tag==="div")
          return(  
            <Div index={`${index}`} key={`${index}`} styles={container.styles} enableEditor={this.enableEditor} classes={container.classlist} >             
                {container.children.map((child,id)=>this.tree(child,index+`:${id}`))}
            </Div>
          )
        else if(container.tag==="img" || container.tag==="image" )
          return(  
            <Img index={`${index}`} key={`${index}`} styles={container.styles}  classes={container.classlist} contents={container.contents}>
                {container.children.map((child,id)=>this.tree(child,index+`:${id}`))}
            </Img>
          )
        else if(container.tag==="p" )
          return(  
            <P index={`${index}`} key={`${index}`} styles={container.styles}  classes={container.classlist} contents={container.contents}>
    
                {container.children.map((child,id)=>this.tree(child,index+`:${id}`))}
            </P>
          )
        else if(container.tag==="span" )
        return(  
          <Span index={`${index}`} key={`${index}`}  styles={container.styles} classes={container.classlist} contents={container.contents}>
              {container.children.map((child,id)=>this.tree(child,index+`:${id}`))}
          </Span>
        )
    
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
    searchElement=(index,target,template)=>{           //index - the current element's index
                                                       // target- the target index; //template-current tree element
        if(index===target){
            return template
        }

        if(template.children.length===0)
            return undefined

        for(let i=0; i< template.children.length; i++){
            let res=this.searchElement(index+`:${i}`,target,template.children[i])
            if(res!==undefined)
                return res  
        }
    }

    //helper function for searching an element given its index
    //Returns the element at index if found or undefined
    search=(index)=>{
        let template={...this.state.template}
        let result
        for(let i=0; i<template.containers.length; i++){
            result=this.searchElement(`${i}`,index,template.containers[i])
            if(result!==undefined)
                break
        }
        return result

    }

    //Insert an element in the tree
    insertElement=(element,index,parent,template)=>{    //element-element to add ; //index-current element index
                                                        //parent- Parent index of element to add //template-parent
        if(index===parent){
            template.children.push(element)
            return 1
        }

        for(let i=0; i< template.children.length; i++)
             if(this.insertElement(element,index+`:${i}`,parent,template.children[i])===1)
                return 1   
        return 0
    }


    //Delete an element recursive 
    //Current - current recursion tree index ; index - index to delete ; 
    //parent - index's parent ; template; current container
    deleteElement=(current,index,parent,template)=>{
        if(current===parent){
            try{            
                template.children.splice(index,1);
                return 1
            }
            catch(err){
                return 0;
            }
        }
        for(let i=0; i< template.children.length; i++)
            if(this.deleteElement(current+`:${i}`,index,parent,template.children[i])===1)
                return 1 
        return 0

    }

    //Helper function for deleting an element given its index in the tree ;
    //Returns: 1 if deleted successfully 0 if not
    delete=(index)=>{
        console.log(index)
        let template={...this.state.template}
        let pid=index.split(':'),parent;                          //Split the index to get its element's parent
        if(pid.length>=2){
            parent=pid.slice(0,pid.length-1).join(':')            //Retrieve the parent index by joining till the second last
            index=parseInt(pid[pid.length-1])                     //The index to delete
            for(let i=0; i<template.containers.length; i++)
                if(this.deleteElement(`${i}`,index,parent,template.containers[i])==0){
                    this.setState({template:template}); 
                    return 1;
                }
            return 0;
        }
        else{
            index=parseInt(pid[pid.length-1])                //If pid size less than 2 delete the entire container
            try{
                template.containers.splice(index,1);
                this.setState({template:template})
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
                    return 1
                }
            }

            template=component
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
        let template={...this.state.template}
        for(let i=0; i<template.containers.length; i++){
            if(this.updateElement(`${i}`,index,template.containers[i],component,move)==1)
                return template   
        }
        return template

    }


    move=(index,pos)=>{
        console.log(index)
        let template={...this.state.template}
        let pid=index.split(':'),parent;  
        if(pid.length>=2){
            let parent_index=pid.slice(0,pid.length-1).join(':')
            index=parseInt(pid[pid.length-1])
            console.log(index)
            let moveObj={index:index,pos:pos}
            template=this.update(parent_index,[],moveObj)
            this.setState({template:template},()=>{return 1})

        }
        else{
            index=parseInt(pid[pid.length-1]) 
            let temp=template.containers[index]
            template.containers[index]=template.containers[index+pos]
            template.containers[index+pos]=temp
            this.setState({template:template},()=>{return 1})
        }


    }


    //TestFunctions
    addContainer=()=>{
        let classes="img-responsive rounded-circle"
        let image={
            id:'0020',
            tag:'img',
            classlist:classes.split(' '),
            children:[],
            contents:{src:"https://img.stackshare.io/service/4418/gT8yKJa7.jpg"}
        }
        let text={
                id:'0021',
                tag:'span',
                classlist:["mt-2"],
                children:[],
                contents:{text:"Discord"}
        }
        classes="mt-4 row col align-items-center"
        let cont={
            id:'002',
            classlist:classes.split(' '),
            children:[image,text],
            tag:"div"
        }
        let template={...this.state.template}
        // console.log(template,"Before template")
        // for(let i=0; i<template.containers.length; i++)
        //     this.insertElement(cont,`${i}`,'0:0',template.containers[i])

        for(let i=0; i<template.containers.length; i++)
            this.insertElement(cont,`${i}`,'0:1',template.containers[i])
        
        // for(let i=0; i<template.containers.length; i++)
        //     this.deleteElement(`${i}`,'1','0',template.containers[i])
        // let res=""
        // for(let i=0; i<template.containers.length; i++){
        //     res=this.searchElement(`${i}`,'1:0',template.containers[i])
        //     if(res!==undefined)
        //         break
        // }
        // console.log(res)

        this.setState({template:template})
        
        
    }

    
    enableEditor=(index,classes)=>{
        let {editor}=this.state
        if(editor.enabled==0 || editor.index!==index){
             document.getElementById('editor').style.display="block"
             document.getElementById('site-container').classList.remove('col-lg-10')
             document.getElementById('site-container').classList.add('col-lg-9')
             this.setState({editor:{enabled:1,index:`${index}`,type:classes}})
            }

        else if(editor.enabled==1 || editor.index===index){
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
            >

            </Editor>
        )

    }

    render() { 
        return ( 
            <React.Fragment> 
                <div className="d-flex flex-lg-row flex-column">
                    <div className="col-xl-2 col-lg-3  ml-n2 container-fluid " style={{display:"none"}} id="editor">
                            {this.state.editor.enabled===1?
                                this.editorDisplay()
                            :""}
                    </div>
                    <div className="col-lg-10 mt-5  col-12 d-flex flex-column  container-fluid" id="site-container">
                    
                        <div className=" mt-5 pt-5 container-fluid  " id="site" style={{overflow:"auto"}}>
                            {this.siteDisplay()}
                        </div>
                    </div>
                </div>
            </React.Fragment>

         );
    }
}
 
export default Template;