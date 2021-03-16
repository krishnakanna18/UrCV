import { toPairs } from 'lodash-es';
import React, { Component } from 'react';
import {
    Link,
  } from "react-router-dom";
import '../css/viewTemplates.css'
class Template extends Component{
    constructor(){
        super();
        this.state={html:""}
    }
    async componentDidMount(){
        let res=await fetch('http://localhost:9000/template/html/'+this.props.template.id+'.html',{
            method:"get",
            credentials:"include"
        })
        let {status}=res
        res=await res.json()
        if(status===200)
            this.setState({html:res.html},()=>{
            })
        else
            console.log(res.log_data)
    }
    render(){
        let to={pathname:'',state:{}}
        console.log(this.props.loggedin)
        if(this.props.loggedin===1 || this.props.loggedin===true){
            to.pathname='/template/edit'
            to.state["id"]=this.props.template._id
            to.state["user"]=this.props.user
            to.state["updateUser"]=this.props.updateUser
        }
        else{
            to.pathname='/user/login'
        }
        if(this.state.html.length>0)
            return <div  className="col-lg-6 col-12 outerTemplate" 
                    >
                        <Link  className="viewTemplate embed-responsive embed-responsive-21by9 mt-3 mb-3"
                        to={to} onMouseLeave={(e)=>{e.target.scrollTop=0}}
                        >   
                            <div dangerouslySetInnerHTML={{__html:this.state.html}} className="embed-responsive-item itemTemplate">
                                
                            </div>
                          
                        </Link>
                        {/* <div className="itemTemplateDesc pt-4 align-items-center justify-content-center">
                                {this.props.template.name}
                        </div> */}
                    </div>

        return <div></div>
    }
}
class Templates extends Component {
    constructor(){
        super();
        this.state={loading:1}
        // this.loadingPage()
    }

    loadingPage(){

        // let element=document.getElementById("loadingPage")
        // element.style.display="block"
        // element.style.height="100%"
        // let root=document.getElementById("root")
        // root.style.display="none"
        
        // setTimeout(()=>{

        //     element.style.display="none"
        //     root.style.display="block"
        // },6000)

    }

    // async componentDidMount(){

    //     let element=document.getElementById("loadingPage")
    //     element.style.display="block"
    //     element.style.height="100%"
    //     let root=document.getElementById("root")
    //     root.style.display="none"
        
    //     setTimeout(()=>{
    //         element.style.display="none"
    //         root.style.display="block"
    //     },3000)
    //     this.setState({loading:0})
        
    // }

    render() { 
        let {templates}=this.props

        return (
            <React.Fragment>
                <div className="mt-3 d-flex flex-lg-row flex-col flex-wrap m-4 itemContainer justify-content-center">
                    {templates.map((template,id)=>{
                       return <Template template={template} key={id} 
                               loggedin={this.props.loggedin} user={this.props.user}
                               updateUser={this.props.updateUser}
                       ></Template>
                    })}
                </div>
                
            </React.Fragment>
          );
    }
}


 
export default Templates;