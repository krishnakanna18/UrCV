import React, { Component } from 'react';
import Autocomplete from '../Components/Autocomplete'
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
    extractSkills=(node,set,index)=>{
        if(node.children===undefined || node.children.length===0){  //Check for leaf node
            if(node.contents!==undefined)                           //Check for empty skill set
                if(node.contents.text!==undefined)
                    {
                    set.push(node.contents.text)
                    return
                    }
        }

        for(let i=0; i<node.children.length; i++)
            this.extractSkills(node.children[i],set,index+`:${i}`)
        

    }
    

    //Classify the skills as basic,intermediate and advanced
    classifySkills=()=>{
        let skills=this.props.component
        let basic_skills=[],intermediate_skills=[],advanced_skills=[]
        this.extractSkills(skills.children[0],basic_skills,`${this.props.index}:0`)               
        this.extractSkills(skills.children[1],intermediate_skills,`${this.props.index}:1`)      
        this.extractSkills(skills.children[2],advanced_skills,`${this.props.index}:2`)
        return {basic_skills,intermediate_skills,advanced_skills}
    }


    //Extract the skills and classify; Get the tool list from the server
    componentDidMount=async()=>{
        let tools=await fetch ('http://localhost:9000/tools')
        let skills=await tools.json()
        let {basic_skills,intermediate_skills,advanced_skills}=this.classifySkills()
        // console.log(basic_skills,intermediate_skills,"COMPONENT DID MOUNT")
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

    moveSkill=(index,p_id,pos)=>{
        console.log(index)
        let level=this.state.innerPage.level
        let set=[...this.state[`${level}_skills`]]
        // console.log(set,"The touched skill")
        if(pos===-1 && index===0)
            return 0;
        if(pos===1 && index===set.length-1)
            return 1;
        let temp=set[index]
        set[index]=set[index+pos]
        set[index+pos]=temp
        this.setState({[`${level}_skills`]:set})
        this.props.moveSkill(p_id,pos)
        
    }

    deleteSkill=(index,p_id)=>{
        // console.log(index)
        let set,old
        let level=this.state.innerPage.level
        set=[...this.state[`${level}_skills`]]
        old=[...set]
        set.splice(index,1)
        this.setState({[`${level}_skills`]:set})
        let res=this.props.removeSkill(p_id)
        if(res===0)
        {
            this.setState({[`${level}_skills`]:old})
        }


    }

    displayList=()=>{
        let {innerPage:{level}}=this.state;
        let p_id;
        let set=[];
        if(level==="")
            return
        if(level==="basic"){
            set=[...this.state.basic_skills]
            p_id=`${this.props.index}:0`
        }
        else if(level==="intermediate"){
            set=[...this.state.intermediate_skills]
            p_id=`${this.props.index}:1`
        }
        else if(level==="advanced"){
            set=[...this.state.advanced_skills]
            p_id=`${this.props.index}:2`
        }
        return(
            <React.Fragment>
                <div className="mt-4  pt-1 d-flex flex-column  align-items-center">
                    {set.map((skill,index)=>{
                       return <div  className="col-lg col-8 mt-1 mb-1 " key={`${index}`} style={{backgroundColor:"#F5FFFA"}}>
                                    <div className="d-flex flex-row justify-content-between">
                                        <span className="pt-2 pb-2">{skill}</span>
                                        <div className="d-flex justify-content-end" >
                                            <div class="dropdown">
                                                <button className="btn " type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    <img className="img-fluid" alt="Alt" src="https://img.icons8.com/ios/24/000000/more.png"/>
                                                </button>
                                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">

                                                    {/* Add a skill above */}
                                                    <button  className="btn dropdown-item " type="btn"  style={{  padding: 0,border:"none"}} >
                                                        <span className="pl-3">
                                                            <img alt="Alt" src="https://img.icons8.com/ios/24/000000/plus-math.png"/>
                                                            Add skill Above
                                                        </span>
                                                    </button>


                                                    {/* Move Above button */}
                                                   {index>0?
                                                    <button  className="btn dropdown-item " type="btn"  style={{  padding: 0,border:"none"}} onClick={()=>this.moveSkill(index,`${p_id}:${index}`,-1)} >
                                                        <span className="pl-3">
                                                            <img className="img-fluid" alt="Alt" src="https://img.icons8.com/ios/24/000000/up.png"/>
                                                            Move Up
                                                        </span>
                                                    </button>
                                                    :""
                                                    }


                                                    {/* Move down button */}
                                                    {index<set.length-1?
                                                    <button  className="btn dropdown-item " type="btn"  style={{  padding:0,border:"none"}} onClick={()=>this.moveSkill(index,`${p_id}:${index}`,+1)}>
                                                        <span className="pl-3">
                                                            <img className="img-fluid" alt="Alt" src="https://img.icons8.com/ios/24/000000/down.png"/>
                                                            Move down
                                                        </span>
                                                    </button>
                                                    :""
                                                    }


                                                    {/* Remove Skill button */}
                                                    <button className="btn dropdown-item " type="btn" style={{  padding:0,border:"none"}}  onClick={()=>this.deleteSkill(index,`${p_id}:${index}`)} >
                                                        <span className="pl-3">
                                                            <img className="img-fluid" alt="Alt" src="https://img.icons8.com/ios/24/000000/multiply.png"/>
                                                            Remove Skill
                                                        </span>  
                                                    </button>


                                                    {/* Add a skill below */}
                                                    <button className="btn dropdown-item " type="btn" style={{  padding:0,border:"none"}}  >
                                                        <span className="pl-3">
                                                            <img alt="Alt" src="https://img.icons8.com/ios/24/000000/plus-math.png"/>
                                                            Add skill below
                                                        </span>  
                                                    </button>
                                                    
                                                </div>
                                            </div>

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

                <div className="col-lg col-8 ">
                    <Autocomplete 
                    options={this.state.global_skills.map((skill)=>skill["tool"])}
                    >
        
                    </Autocomplete>

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
// Plus symbol - <img src="https://img.icons8.com/ios/24/000000/plus-math.png"/>