import React, { Component } from 'react';
import '../css/containerEditor.css'
import TextEditor from './TextEditor'
import ImgEditor from './ImgEditor'
import LinkEditor from './LinkEditor'
import Autocomplete from '../Components/Autocomplete'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
class Container extends Component {
    constructor(props){
        super(props);
        this.state={ innerPage:{
            enabled:false,
            index:"",
            global_skills:[]
        } }
    }

    componentDidMount=async()=>{
        if(this.props.type && this.props.type==="project"){
            let tools=await fetch ('http://localhost:9000/tools')
            let skills=await tools.json()
            this.setState({global_skills:skills})

        }
    }

   
    enableInner=(index)=>{
        this.setState({innerPage:{enabled:true,index}})
    }

    disableInner=()=>{
        this.setState({innerPage:{enabled:false,index:""}})

    }

    innerTree=(component,pid,projectStack=undefined)=>{
        let queue=[{...component,id:pid}],editors=[]
        while(queue.length)
        {
            let cur=queue.shift();
            if(cur.tag!=="div")
            {
                editors.push(cur);
                if(cur.tag==="p" || cur.tag==="span" || cur.tag==="img")
                    continue;
            }
            if(cur.tag==="div" && cur.classlist.includes("project-stack")){
                if(projectStack!==undefined){
                    projectStack["techs"]=JSON.parse(JSON.stringify(cur.children))
                    projectStack["techType"]=projectStack["techs"][0]
                    projectStack["parent"]=cur.id
                }
                continue
            }
            if(cur.children)
                for(let i=0; i<cur.children.length; i++)
                {
                    queue.push({...cur.children[i],id:`${cur.id}:${i}`});
                }

        }
        return editors

    }



    createTech=(index,sample=undefined,parent="")=>{
        let tech=this.state.global_skills[index]
        let techs=document.getElementsByClassName(`projectTechContainer:${this.props.index}`)[0].children
        techs=[...techs].map(tech=>tech.outerText)
        if(techs.includes(tech["tool"])){
            return {success:-1,message:"Framework already Present"}
        }
        sample["contents"].text=tech["tool"]
        this.props.addElement(parent,sample)
        return {success:1}
    }

    removeTech=(id,parent)=>{
        console.log(id,parent)
        this.props.removeElement(`${parent}:${id}`);
    }



    displayInner=()=>{
        let {innerPage:{index}}=this.state
        let containerIndex=`${this.props.index}:${index}`
        let innerComponent=JSON.parse(JSON.stringify(this.props.component.children[index]))
        let projectStack=undefined

        if(this.props.type!==undefined && this.props.type==="project")
            projectStack={"techs":[],"techType":{},"parent":""}

        let disp=this.innerTree(innerComponent,containerIndex,projectStack)
        return(
                <React.Fragment>
                    <div className="row col mt-n2 justify-content-start">
                        <div className="col offset-n2">
                            <button className="btn"  onClick={()=>this.disableInner()}><img src="/icons/back.png"   style={{width:"22px"}}  alt="REAL"   className="img-fluid"/> </button><span className="ml-n2">Back</span>
                        </div>
                    </div>
                    {this.props.type!==undefined && this.props.type==="project"?
                    <div className="mt-5 mb-1  projectStackContainer">
                        <p className="mb-n2" style={{textAlign:"center", color:"rgb(74, 150, 154)",fontWeight:"bold"}}>Project Tech Stack</p>
                        <div className="mb-2 projectStackHeader" >
                        <Autocomplete  key={`${this.props.index}:autocomplete`}
                            options={this.state.global_skills.map((skill)=>skill["tool"])}
                            addOption={this.createTech}
                            type="project"
                            techSample={projectStack.techType}
                            parent={projectStack.parent}
                            // addPosition={index}         //Specify the add position
                        >
                        </Autocomplete>
                        </div>
                        <div className={`mb-3 d-flex d-inline-flex flex-row flex-wrap projectTechContainer:${this.props.index}`}>
                        {projectStack["techs"].map((tech,id)=>{
                            return <div className="btn col-auto projectTech" key={id}  data-toggle="tooltip" data-placement="top" title={"Remove Tool"}
                                    onClick={()=>{this.removeTech(id,projectStack["parent"])}}
                                    >
                                        {tech.contents["text"]}
                                    </div>
                        })}
                        </div>
                    </div>
                    :""}
                    <div className="mt-2 d-flex flex-column col" >
                        {disp.map((element,id)=>{
                            if(element.tag==="p" || element.tag==="span")
                                return <TextEditor key={`${id}`} text={element} 
                                        modifyText={this.props.modifyElement}
                                        index={element.id} domId={`${id}`}
                                        >

                                        </TextEditor>
                            if(element.tag==="img" || element.tag==="image")
                                return <ImgEditor key={`${id}`} img={element}
                                        index={element.id}
                                        modifyImage={this.props.modifyElement}
                                        >
                                            
                                        </ImgEditor>
                            if(element.tag==="a"){
                                return <LinkEditor  key={`${id}`}  index={element.id} link={element}>
                                        </LinkEditor>
                            }
                                
                        })
                        }
                    </div>
                </React.Fragment>
        )
    }

    //Remove an element at the given index -- index:tree index
    removeElement=(index)=>{
        // console.log(index)
        let res=this.props.removeElement(index)
        if(res===0)
        {   
            console.log(index)
        }
        
    }

    //Move an element at the given index by pos -- index:tree index
    moveElement=(index,pos)=>{
        // console.log(index)
        this.props.moveElement(index,pos)
    }

    //Adding a project 
    addProject=()=>{
        console.log("Inside the function")
        let project=this.props.projectTemplate
        console.log(project,this.props.index)
        this.props.addElement(this.props.index,project)
    }

    //Display the list of components present in the outer container
    displayOuter=()=>{
        let components
        try{
            components=[...this.props.component.children]
        }
        catch(e){
            components=[]
        }
            let index=this.props.index
            // console.log(index)
            return( 
                <React.Fragment>
                    {this.props.type && this.props.type==="project"?
                    <button className="projectAddContainer btn" onClick={this.addProject}>
                         <img alt="Alt" src="/icons/plus-math.png"/>
                         <span className="ml-1">Add a project</span>
                    </button>
                    :""}

                    <div className="mt-4 d-flex flex-column">
                        {components.map((component,id)=>{
                            return(
                            <div key={`${id}`} className="mt-2 mb-2 pt-2 pb-2 d-flex flex-row justify-content-between align-contents-center" style={{backgroundColor:"#F5F5F5"}}
                                 onMouseEnter={()=>{
                                     let ele=document.getElementById(index+`:${id}`)
                                     ele.setAttribute("data-pre-color",ele.style.backgroundColor)
                                     if(ele)
                                        ele.style.backgroundColor="#D6F1F1"
                                    }}
                                 onMouseLeave={()=>{

                                    let ele=document.getElementById(index+`:${id}`)
                                    if(ele)
                                       ele.style.backgroundColor=ele.getAttribute("data-pre-color")

                                 }}
                            >
                                <div className="col" 
                                     style={{textAlign:"center"}}
                                     onClick={()=>{this.enableInner(id); 
                                        let ele=document.getElementById(index+`:${id}`)
                                        if(ele)
                                           ele.style.backgroundColor=ele.getAttribute("data-pre-color")}}
                                 >
                                     {this.props.type==="project" ?
                                     `Project ${id+1}`
                                     :`Container ${id}`
                                     }
                                </div>

                                <div className="d-flex col justify-content-end" >
                                    <div className="dropdown">
                                        <button className="btn " type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <img className="img-fluid" alt="Alt" src="/icons/more.png"/>
                                        </button>
                                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                            {/* Remove the component */}
                                            <button  className="btn dropdown-item " type="btn"  style={{  padding: 0,border:"none"}}  onClick={()=>this.removeElement(`${index}:${id}`)}>
                                                    <span className="pl-3">
                                                        <img className="img-fluid" alt="Alt" src="/icons/multiply.png"/>
                                                            Remove 
                                                    </span> 
                                            </button>

                                         

                                              {/* Move Above button */}
                                              {id>0?
                                                    <button  className="btn dropdown-item " type="btn"  style={{  padding: 0,border:"none"}} onClick={()=>this.moveElement(`${index}:${id}`,-1)} >
                                                        <span className="pl-3">
                                                            <img className="img-fluid" alt="Alt" src="/icons/up.png"/>
                                                            Move Up
                                                        </span>
                                                    </button>
                                                    :""
                                                }


                                                {/* Move down button */}
                                                {id<components.length-1?
                                                <button  className="btn dropdown-item " type="btn"  style={{  padding:0,border:"none"}} onClick={()=>this.moveElement(`${index}:${id}`,+1)}>
                                                    <span className="pl-3">
                                                        <img className="img-fluid" alt="Alt" src="/icons/down.png"/>
                                                        Move down
                                                    </span>
                                                </button>
                                                :""
                                                }
                                        </div>
                                    </div>
                                </div>
                            <hr className="hr"></hr>
                        </div>
                            )
                        })}
                    </div>
                </React.Fragment>
                
                )

    }

    render() { 
        return ( 
                <React.Fragment>
                    {this.state.innerPage.enabled===false?this.displayOuter():""}
                    {this.state.innerPage.enabled===true?this.displayInner():""}
                </React.Fragment> 
        );
    }

   
}
 
export default Container;