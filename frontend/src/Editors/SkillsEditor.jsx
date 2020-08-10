import React, { Component } from 'react';
// import {
//     BrowserRouter as Router,
//     Route,
//     Link,
//     Switch
//   } from "react-router-dom";
import '../../public/SkillEditor.css'
class Skillset extends Component {
    constructor(props){
        super(props);
        this.state={global_skills:[],basic_skills:[],intermediate_skills:[],advanced_skills:[],
                    innerPage:{
                        isInner:false,
                        level:""                        
                    }}
        console.log(this.props.index)
        
    }


    //Extract the skills from the skill-box specified as node
    extractSkills=(node,set,index,bs_dom)=>{
        if(node.children===undefined || node.children.length===0){
            if(node.contents.text!==undefined)
                {set.push(node.contents.text)
                 bs_dom.push(
                    <div  className="col" key={`${index}`} style={{backgroundColor:"#F5FFFA	"}}>
                        <div className="d-flex flex-row justify-content-between">
                            <span className="pt-2 pb-2">{node.contents.text}</span>
                            <div className="d-flex justify-content-end" >
                                <button type="btn"  style={{  padding: 0,border:"none", backgroundColor:"#F5FFFA"}} >
                                    <img className="img-fluid" src="https://img.icons8.com/ios/24/000000/up.png"/>
                                </button>
                                <button type="btn"  style={{  padding:0,border:"none",backgroundColor:"#F5FFFA"}} >
                                    <img className="img-fluid" src="https://img.icons8.com/ios/24/000000/down.png"/>
                                </button>
                                <button type="button" className="close" aria-label="Close" onClick={()=>this.deleteSkill(index)} >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        </div>
                    </div>
                 )
                    console.log(index)
                return
                }
        }
        // for(let child of node.children)
        //     this.extractSkills(child,set)
        for(let i=0; i<node.children.length; i++)
            this.extractSkills(node.children[i],set,index+`:${i}`,bs_dom)

    }
    

    //Classify the skills as basic,intermediate and advanced
    classifySkills=()=>{
        let skills=this.props.component
        let basic_skills=[],intermediate_skills=[],advanced_skills=[],bs_dom=[]
        this.extractSkills(skills.children[0],basic_skills,`${this.props.index}:0`,bs_dom)
        console.log(bs_dom)
        this.extractSkills(skills.children[1],intermediate_skills,`${this.props.index}:1`,bs_dom)
        return {basic_skills,intermediate_skills,advanced_skills}
    }

    //Extract the skills and classify; Get the tool list from the server
    componentDidMount=async()=>{
        let tools=await fetch ('http://localhost:9000/tools')
        let skills=await tools.json()
        let {basic_skills,intermediate_skills,advanced_skills}=this.classifySkills()
        this.setState({global_skills:skills,basic_skills,intermediate_skills,advanced_skills},(err,res)=>{
            if(err)
                throw err;
            // console.log(this.state)

        })
    }   

    //Enable or disable the inner page
    changeInner=(level="")=>{
            this.setState({innerPage:{isInner:!this.state.innerPage.isInner,level}})   
    }

    move=(index,pos)=>{

    }

    deleteSkill=(index)=>{
        let set
        let level=this.state.innerPage.level
        if(level==="basic"){
            set=[...this.state.basic_skills]
            set.splice(index,1)
            this.setState({basic_skills:set})

        }
        else if(level==="intermediate"){
            set=[...this.state.intermediate_skills]
            set.splice(index,1)
            this.setState({intermediate_skills:set})

        }
        else if(level==="advanced"){
            set=[...this.state.advanced_skills]
            set.splice(index,1)
            this.setState({advanced_skills:set})

        }

    }

    displayList=()=>{
        let {innerPage:{level}}=this.state;
        console.log(level)
        let set=[];
        if(level==="")
            return
        if(level==="basic")
            set=[...this.state.basic_skills]
        else if(level==="intermediate")
            set=[...this.state.intermediate_skills]
        else if(level==="advanced")
            set=[...this.state.advanced_skills]
        return(
            <React.Fragment>
                <div className="mt-4  pt-1 d-flex flex-column  align-items-center">
                    {set.map((skill,index)=>{
                       return <div  className="col" key={`${index}`} style={{backgroundColor:"#F5FFFA	"}}>
                                    <div className="d-flex flex-row justify-content-between">
                                        <span className="pt-2 pb-2">{skill}</span>
                                        <div className="d-flex justify-content-end" >
                                            <button type="btn"  style={{  padding: 0,border:"none", backgroundColor:"#F5FFFA"}} >
                                                <img className="img-fluid" src="https://img.icons8.com/ios/24/000000/up.png"/>
                                            </button>
                                            <button type="btn"  style={{  padding:0,border:"none",backgroundColor:"#F5FFFA"}} >
                                                <img className="img-fluid" src="https://img.icons8.com/ios/24/000000/down.png"/>
                                            </button>
                                            <button type="button" className="close" aria-label="Close" onClick={()=>this.deleteSkill(index)} >
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                    </div>
                              </div>
                    })}
                </div>
            </React.Fragment>
        )
        


    }
    //Render the inner page
    displayInner=()=>{
        return(
            <React.Fragment>
                <div className="row  mt-n2 justify-content-start">
                    <div className="col offset-n2">
                        <button className="btn"  onClick={this.changeInner}><img src="https://img.icons8.com/ios/50/000000/undo.png"   style={{width:"22px"}}  alt="REAL"   className="img-fluid"/> </button><span className="ml-n2">Back</span>
                    </div>
                </div>
                {this.displayList()}
            </React.Fragment>
        )

    }
    

    displaySkills=()=>{
        let src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNNiAwbDEyIDEyLTEyIDEyeiIvPjwvc3ZnPg==" 
        if(this.state.innerPage.isInner===false){
            return(
                <div className="d-flex flex-column justify-content-start text-left align-contents-center">

                <div  className="row justify-content-between" >
                    <div className=""  onInput={(e)=>{console.log(e)}}>
                        Basic
                    </div>
                    <div>
                        <button className="btn" onClick={()=>this.changeInner('basic')}><img className="arrow" src={`${src}`}  alt="Form"></img></button>
                    </div>
                </div>

                <hr className="hr"></hr>

                <div className="row justify-content-between"  >
                    <div className=""  onInput={(e)=>{console.log(e)}}>
                        Intermediate 
                    </div>
                    <div>
                            <button className="btn" onClick={()=>this.changeInner('intermediate')}><img className="arrow" src={`${src}`}  alt="Formality" ></img></button>
                    </div>
                </div>
                
                <hr className="hr"></hr>

                <div className="row justify-content-between"  >
                    <div className=""  onInput={(e)=>{console.log(e)}}>
                        Advanced
                    </div>
                    <div>
                        <button className="btn" onClick={()=>this.changeInner('advanced')}><img className="arrow" src={`${src}`} alt="Formali"></img></button>         
                    </div>
                </div>

            </div>

            )
        }
        return this.displayInner()
    }
    

    render() {
        return ( 
            <React.Fragment>
                {this.displaySkills()}
            </React.Fragment>
         );
    }
}
 
export default Skillset;

//Down arrow --- <img src="https://img.icons8.com/android/24/000000/down.png"/>
//Up arrow --- <img src="https://img.icons8.com/ios/24/000000/up.png"/>