import React,{Component, useRef} from 'react';
import { withRouter } from 'react-router-dom'
import '../css/navbar.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import TemplateEditor from '../Templates/templateEditor';
import Home from './Home';
import LogIn from './LogIn';
import Templates from './Templates';
import Profile from './Profile';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch
  } from "react-router-dom";
import { Redirect } from "react-router-dom";
import addContainer from '../Editors/addingContainer';
import Menu from './Menu';

class Navbar extends Component {
    constructor(){
        super()
        this.state={loggedin:false,user:{},templates:[]}
        this.loginUser=this.loginUser.bind(this)
        this.logoutUser=this.logoutUser.bind(this)
    }

    //Initial rendering to see if the user is already logged in
    async componentDidMount(){
        let btn=document.getElementById("publishBtn")           //Remove P
        if(btn)
            btn.remove()

        let res=await fetch('http://localhost:9000/',{
            method:"GET",
            credentials:"include"
        })
        res=await res.json()
        this.setState({...res},()=>{
        })
    }

    // componentWillUnmount(){
    //     console.log("Unmounted Nav")
    // }
    // componentWillUnmount(){
    //     console.log("Unmounted Nav")
    // }

    //Log in a user
    loginUser(user,loggedin){

        this.setState({user,loggedin},()=>{
            return true
        })

    }

    //To logout a user
    async logoutUser(){
        let res=await fetch('http://localhost:9000/user/logout',{
            method:"post",
            credentials:"include"
        })
        res=await res.json()
        this.setState({loggedin:false,user:{}})
        
    }

    updateUser=(user)=>{
        console.log("HI Im being Printed",user)
        this.setState({user:user},()=>{
            console.log("Called")

        })
    }
   
    render() { 
        return ( 
            <React.Fragment>
                <Router>
                    <Switch>
                        <Route exact path='/' component={()=><Home loggedin={this.state.loggedin} user={this.state.user} templates={this.state.templates} logoutUser={this.logoutUser}></Home> } ></Route>
                        <Route exact path="/user/login" component={()=><LogIn loginUser={this.loginUser}></LogIn>}></Route>
                        <Route exact path="/user/profile" component={()=><Profile loggedin={this.state.loggedin} updateUser={this.updateUser}></Profile>}></Route>
                        <Route exact path='/template/view' component={()=><Templates templates={this.state.templates} user={this.state.user} loggedin={this.state.loggedin} updateUser={this.updateUser} loginUser={this.loginUser}></Templates>}></Route>
                        <Route exact path='/template/edit' component={(props)=><TemplateEditor {...props} loggedin={this.state.loggedin} logoutUser={this.logoutUser}></TemplateEditor>}></Route>
                        <Route exact path='/insert/container' component={addContainer}></Route>
                    </Switch>
                </Router>
            </React.Fragment>
         );
    }
}

 
export default Navbar;