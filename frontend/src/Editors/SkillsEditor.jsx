import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch
  } from "react-router-dom";
import '../../public/SkillEditor.css'
class Skillset extends Component {
    constructor(props){
        super(props);
        this.state={cur_skills:[],global_skills:[],basic_skills:[],intermediate_skills:[],advanced_skills:[],
                    innerPage:{
                        isInner:false,
                        
                    }}
        console.log(this.props.component)
    }
    
    componentDidMount=async()=>{
        let tools=await fetch ('http://localhost:9000/tools')
        let skills=await tools.json()
        console.log(skills)
        this.setState({global_skills:skills})
    }   


    changeInner=()=>{

        
    }

    displayInner=()=>{

    }
    



    displaySkills=()=>{
        let src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNNiAwbDEyIDEyLTEyIDEyeiIvPjwvc3ZnPg==" 
        if(this.state.innerPage.isInner==false){
            return(
                <div className="d-flex flex-column justify-content-start text-left align-contents-center">

                <div  className="row justify-content-between" >
                    <div className=""  onInput={(e)=>{console.log(e)}}>
                        Basic
                    </div>
                    <div>
                            <button className="btn"><img className="arrow" src={`${src}`}  onClick={()=>this.changeInner('basic')}></img></button>
                    </div>
                </div>

                <hr className="hr"></hr>

                <div className="row justify-content-between"  >
                    <div className=""  onInput={(e)=>{console.log(e)}}>
                        Intermediate 
                    </div>
                    <div>
                            <button className="btn"><img className="arrow" src={`${src}`}  onClick={()=>this.changeInner('intermediate')}></img></button>
                    </div>
                </div>

                <hr className="hr"></hr>

                <div className="row justify-content-between"  >
                    <div className=""  onInput={(e)=>{console.log(e)}}>
                        Advanced
                    </div>
                    <div>
                        <button className="btn"><img className="arrow" src={`${src}`} onClick={()=>this.changeInner('advanced')}></img></button>         
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

