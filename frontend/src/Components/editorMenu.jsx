import React, { Component } from 'react';
import SaveIcon from '@material-ui/icons/Save'
import PublishIcon from '@material-ui/icons/CloudUploadOutlined'
import Button from '@material-ui/core/Button'
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch
  } from "react-router-dom";
import { ButtonGroup } from '@material-ui/core';
class EditorMenu extends Component {
    userMenu(){
        console.log(this.props)
        if(!this.props.loggedin)
           return <li  className="nav-item ml-auto" >
                  <Link className="nav-link" to={{
                      pathname:"/user/login",
                      state:{
                          params:{
                            redirect:'/'
                          }
                      }
                  }}>
                            <button className="btn" style={{backgroundColor:"#45b29a", color:"white"}}>
                                Sign in
                            </button>
                      </Link> 
                </li>
        
        return <React.Fragment>
               <li  className="nav-item"> 
                        <Link className="nav-link" to={{
                            pathname:'/user/profile',
                            state:{
                                user:this.props.user
                            }
                        }}>
                            Your Sites
                        </Link>
                </li>
                <li  className="nav-item ml-atuo" style={{left:"100%"}}>        
                    <div className="dropdown show">
                    <a className="btn btn-secondary" href="#" role="button" id="userMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{border:"none",background:"none"}}>
                        <img src="/icons/userIcon.png" style={{width:"32px", heigh:"10px"}}></img>
                    </a>
                    <div className="dropdown-menu " aria-labelledby="userMenu" id="menu">
                        <Link className="dropdown-item col mr-2" to={{
                                            pathname:"/user/profile",
                                            state:{
                                                user:this.props.user
                                            }
                                        }}>
                            <svg viewBox="0 0 24 24" width="1em" height="1em" className="mr-3"><path fillRule="evenodd" d="M17 3c1.1 0 2 .9 2 2v16l-7-3-7 3 .01-16c0-1.1.89-2 1.99-2h10zm-5 10.43L14.472 15l-.656-2.96L16 10.048l-2.876-.256L12 7l-1.124 2.792L8 10.048l2.184 1.992L9.528 15 12 13.43z"></path>
                            </svg>
                        {this.props.user.username}
                        </Link>
                        <a className="dropdown-item col" onClick={async()=>await this.props.logoutUser()}  >
                        <svg viewBox="0 0 24 24" width="1em" height="1em" className="mr-3"><path fillRule="evenodd" d="M21 3.01a2 2 0 0 1 2 2v14c0 1.1-.9 1.98-2 1.98H10c-1.1 0-2-.88-2-1.98V15h2v4.02h11V4.99H10V9H8V5.01c0-1.1.9-2 2-2h11zM5 16l-4-4 4-4v3h10v2H5v3z"></path></svg>
                        Sign out</a> 
                    </div>
                </div>
                </li>
                </React.Fragment>  
    }
    render() { 
        return (  
                    <nav className="navbar navbar-expand-lg navbar-light  sticky-top navMenu" id="navBarSite" style={{backgroundColor:"white", fontSize:"110%"}}>
                        <Link className="navbar-brand ml-5"  to="/" >
                            UrCV    
                        </Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav align-items-center ml-5">
                                <li className="nav-item">
                                    <Link className="nav-link ml-2 mr-2" to='/'>Home</Link>
                                </li>
                                <li className="nav-item" >
                                    <Link  className="nav-link ml-2 mr-2" to={{
                                        pathname:'/template/view',
                                    }}>Design</Link>   
                                </li>
                            </ul>
                            <ul className="navbar-nav align-items-center  container">
                                <li className="nav-item">
                                    <ButtonGroup variant="contained" color="primary">
                                        <Button onClick={async()=>{await this.props.download()}}  startIcon={<SaveIcon />}>Download as PDF</Button>
                                        <Button onClick={async()=>{await this.props.deploy()}}  color="secondary" startIcon={<PublishIcon />}>Publish to Github</Button>
                                    </ButtonGroup>
                                </li>
                            </ul>
                            <ul className="navbar-nav align-items-center ml-auto mr-5">
                                {this.userMenu()}
                            </ul>
                        </div>
                    </nav>
        );
    }
}
 
export default EditorMenu;