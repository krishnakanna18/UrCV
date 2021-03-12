import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
class LogIn extends Component {
    constructor(){
        super();
        this.state={loggedin:false}
    }
    async signin(){
        // console.log(this.props.redirect.pathname)
        let res=await fetch('http://localhost:9000/user/login',{
            method:"post",
            credentials:"include",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                username:"test",
                password:"test"

            })
        })
        let {status}=res
        res=await res.json()
        let {login}=this.props
        if(status===200)
            if(login(res.user,res.loggedin))
                this.setState({loggedin:true})

    }

    render(){
        return(
            <div>
              {this.state.loggedin===false?  
              <button className="btn btn-drak"
              onClick={async()=>this.signin()}
              >
                  Sign in
            </button>:<p></p>
                 }
              {this.state.loggedin===true?
              <Redirect to={this.props.redirect.pathname}></Redirect>
              :<div></div>
              }
            </div>
        )
    }
}
 
export default LogIn;