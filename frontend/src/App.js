import React, { Component } from 'react';
import Nav from './Components/Navbar'
import { Switch } from 'react-router-dom';
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";

class App extends Component {
  constructor(){
    super();
    this.state={user:""};
  }
  componentDidMount(){
    fetch('http://localhost:9000')
    .then(res=>res.json())
    .then(res=>{
      this.setState({user:res});
    }
    )
  }
  render() {
    return (
      <React.Fragment>
        <Nav user={this.state.user} pattern="Actor"/>
        
      </React.Fragment>
       
    );
  }
}

export default App;
