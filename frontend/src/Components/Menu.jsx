import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Link,
  } from "react-router-dom";
import '../css/landingpage.css'
import MenuUI from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
class Menu extends Component {


    componentDidMount=()=>{

        //Apply properties to when scrolled down
        window.onscroll = function() {
            var doc = document.getElementById("menuTopBackground");
            var bottom =window.pageYOffset;
            if(bottom <= 1000 || bottom===undefined || bottom===null) {
                try{
                    let nav=document.getElementById("navTopBg")
                    let top=document.getElementById("logoMenuPg")
                    top.style.color="white"
                    nav.classList.remove("scrolledMenuBg")
                    nav.classList.add("transparent")
                }
                catch(e){}
            }
            else {
                let nav=document.getElementById("navTopBg")
                let top=document.getElementById("logoMenuPg")
                top.style.color="black"
                top.classList.add("p-2")
                nav.classList.add("scrolledMenuBg")
                nav.classList.remove("transparent")

            }
        } 
    }

    userMenu(){
        if(!this.props.loggedin)
           return <li  className="nav-item" >
                  <Link className="nav-link" to={{
                      pathname:"/user/login",
                      state:{
                          params:{
                            redirect:'/'
                          }
                      }
                  }}>       
                            <Button style={{color:"white",fontWeight: '700', fontFamily:'Slack-Circular-Pro,"Helvetica Neue",Helvetica,"Segoe UI",Tahoma,Arial,sans-serif',fontSize:"15px",background: 'transparent', border:'1px solid white'}}>
                                Sign in
                            </Button>
                      </Link> 
                </li>
             
        
        return <React.Fragment>
               <li  className="nav-item mr-3 ml-3"> 
                        <Link className="nav-link" to={{
                            pathname:'/user/profile',
                            state:{
                                user:this.props.user
                            }
                        }}>
                            <span classname="headerMenuPage" style={{fontSize:"15px",color: 'white',fontWeight: '700',
    fontFamily:'Slack-Circular-Pro,"Helvetica Neue",Helvetica,"Segoe UI",Tahoma,Arial,sans-serif'}}> Your Sites </span>
                            
                        </Link>
                </li>
                <li  className="nav-item" style={{left:"100%"}}>        
                    <div className="dropdown show">
                    <a className="btn btn-secondary" href="#" role="button" id="userMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{border:"none",background:"none"}}>
                        <AccountCircleIcon style={{width:"100px" }}></AccountCircleIcon>
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
            <React.Fragment>
                <div id="menuTopBackground" >
                    <div className="container-lg">
                        <nav className="transparent navbar navbar-dark navbar-expand-lg" id="navTopBg">
                            
                            <Link className="navbar-brand bold " to='/' >
                                <span id="logoMenuPg" style={{color:'white', fontSize:"30px",fontFamily: 'Architects Daughter', fontWeight:"bolder"}}>UrCV</span>
                            </Link>

                            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon" style={{color:'white'}}></span>
                            </button>

                            <div className="collapse navbar-collapse  " id="navbarSupportedContent">
                                <ul className="navbar-nav mr-auto align-items-center">
                                    <li className="nav-item mr-3 ml-3 activeItem" >
                                        <Link to='/' className="nav-link"><span className="headerMenuPage" style={{fontSize:"15px"}}>Home</span></Link>
                                    </li>
                                    <li className="nav-item mr-3 ml-3" >
                                        <Link to='/template/view' className="nav-link"><span className="headerMenuPage" style={{fontSize:"15px"}}>Design</span></Link>
                                    </li>
                                    <li className="nav-item mr-3 ml-3" >
                                        <Link to='/template/view' className="nav-link"><span className="headerMenuPage" style={{fontSize:"15px"}}>About</span></Link>
                                    </li>

                                </ul>


                                <ul className="navbar-nav ml-auto align-items-center">
                                    {this.userMenu()}
                                </ul>
                            </div>

                        </nav>

                        <h1 className="centerTextLanding mt-5 col-12" >
                                UrCV makes it easier to <span style={{color: "#ecb22e"}}>build and deploy</span> your portfolio at no cost.
                        </h1>
                    
                        <div className="container mt-5" style={{textAlign:"center"}}>
                            <Button style={{backgroundColor:"white", color:"#611f69",textTransform: 'none',boxShadow: 'inset 0 0 0 1px #611f69'}}>
                                <Link className="p-3 buttonTextMenu" to='/template/view'>Try our templates</Link>
                            </Button>
                        </div>

                    </div>
                </div>
                <div style={{height:"2000px"}} className="middleMenuPg">
                    
                </div>
            </React.Fragment>
        );
    }
}
 
export default Menu;

