import { toPairs } from 'lodash-es';
import { withRouter} from 'react-router-dom'
import React, { Component } from 'react';
import {serverEndPoint} from '../config'

class Template extends Component{
    constructor(){
        super();
        this.state={html:""}
    }
    async componentDidMount(){

        let res=await fetch(`${serverEndPoint}/template/html/`+this.props.template.id+'.html',{
            method:"get",
            credentials:"include"
        })
        let {status}=res
        res=await res.json()
        if(status===200)
            this.setState({html:res.html},()=>{
            })
        else{
            // console.log(res.log_data)
        }
    }
    componentWillUnmount(){
        // console.log("Unmounted Template")
    }
    loadingPage(){
        let element=document.getElementById("loadingPage")
        element.style.display="block"
        element.style.height="100%"
        let root=document.getElementById("root")
        root.style.display="none"
        
        setTimeout(()=>{
            element.style.display="none"
            root.style.display="block"
        },3000)
    }

    async createSite(){
        let {user,loggedin,template:{_id}}=this.props
        if(this.props.loggedin===0 || this.props.loggedin===false)
            {
                this.props.history.push({
                    pathname:'/user/login',
                    state:JSON.stringify({
                        redirect:this.props.history.location.pathname,
                    })
                })
                return
            }
        
        let site=await fetch(`${serverEndPoint}/website/create`,{
            method:"POST",
            credentials:"include",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                username:user.username,
                id:_id
            })
        })
        site=await site.json()
        user=site.user
        this.props.updateUser(user)

        //Setting to local storage so that page still works on refresh
        localStorage.setItem("tempId",_id);
        localStorage.setItem("user",JSON.stringify(user));
        localStorage.setItem("loggedin","true");

        let site_id=site.website_id
        this.props.history.push({
            pathname:'/template/edit',
            state:{
                id:site_id,
                user:user
            }
        })
        
    }
    render(){
        if(this.state.html.length>0)
            return <div  className="col-lg-6 col-12 outerTemplate" 
                    >
                        <div  className="viewTemplate embed-responsive embed-responsive-21by9 mt-3"
                        // to={to} 
                        onClick={async()=>{await this.createSite()}}
                        onMouseLeave={(e)=>{e.target.scrollTop=0}}
                        style={{zoom:0.4}} 
                        >   
                            <div dangerouslySetInnerHTML={{__html:this.state.html}} className="embed-responsive-item itemTemplate">
                            </div>
                          
                        </div>
                        <div className="itemTemplateDesc pt-4 mb-3 align-items-center justify-content-center" style={{color:"black"}}>
                                {this.props.template.name}
                        </div>
                    </div>

        return <div></div>
    }
}

export default withRouter(Template);