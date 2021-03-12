import React, { Component } from 'react';
import {
    Link,
  } from "react-router-dom";
import '../../public/css/viewTemplates.css'
class Template extends Component{
    constructor(){
        super();
        this.state={html:""}
    }
    async componentDidMount(){
        let res=await fetch('http://localhost:9000/template/html/'+this.props.template.id+'.html')
        let {status}=res
        res=await res.json()
        if(status===200)
            this.setState({html:res.html},()=>{
            })
        else
            console.log(res.log_data)
    }
    render(){
        if(this.state.html.length>0)
            return <Link  className="col-lg-6 col-12 outerTemplate" 
                    to={
                        {
                            pathname:'/template/edit',
                            state:{
                                    id:this.props.template._id
                            }
                        }
                    }
                    >
                        <div  className="viewTemplate embed-responsive embed-responsive-21by9 mt-3 mb-3 ml-1 mr-1">
                            <div dangerouslySetInnerHTML={{__html:this.state.html}} className="embed-responsive-item itemTemplate">

                            </div>
                        </div>
               </Link>
        return <div></div>
    }
}
class Templates extends Component {
    constructor(){
        super();
        this.state={}
    }
    render() { 
        let {templates}=this.props

        return (
            <React.Fragment>
                <div className="mt-3 d-flex flex-lg-row flex-col flex-wrap m-5 itemContainer">
                    {templates.map((template,id)=>{
                       return <Template template={template} key={id}></Template>
                    })}
                </div>
            </React.Fragment>
          );
    }
}


 
export default Templates;