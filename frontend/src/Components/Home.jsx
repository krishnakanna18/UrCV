import React, { Component } from 'react';
import Menu from './Menu';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch
  } from "react-router-dom";
class Home extends Component {
    constructor(){
        super()
        this.state={loggedin:false}
    }
    componentDidMount(){
        try{
        // document.getElementById("navBarSite").remove() //Removes the default navbar
        }
        catch(e){

        }

    }
    componentWillUnmount(){
    }
    render() { 
        return ( 
            <React.Fragment>
                    <Menu loggedin={this.props.loggedin} user={this.props.user} logoutUser={this.props.logoutUser} templates={this.props.templates}></Menu>
            </React.Fragment>
         );
    }
}
 
export default Home;