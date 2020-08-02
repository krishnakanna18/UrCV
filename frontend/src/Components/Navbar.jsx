import React,{Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Popper from 'popper.js'
// import Template from '../Templates/exports';
// import App from '../Templates/dev/1/app';
import Trial from '../Templates/trial';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch
  } from "react-router-dom";
import { cssNumber } from 'jquery';

// class Git extends Component{
//     constructor(){
//         super();
//         this.state={response:""}
//     }
//     componentDidMount=async()=>{
//         let keys=await fetch(`https://github.com/login/oauth/authorize?client_id=${}`);
//         let key=await keys.json();
//         fetch('http://localhost:9000/gitauth')
//         .then(res=>res.json())
//         .then(res=>{
//             console.log(res);
//             this.setState({response:res});
//         })
//     }
// }
class Navbar extends Component {
    constructor(){
        super();
        this.state={user:''}
    }
    componentDidMount(){
        this.setState({user:this.props.user})
    }
    isloggedin(){
        if(this.props.user.loggedin===true)
            return <Link className="nav-link" to="/user/profile">Loggedin</Link>
        else
            return <Link className="nav-link" to="/user/login">Log In</Link>
    }
    makeActive(){

    }
    render() { 
        console.log("/test/"+this.props.pattern)
        return ( 
            <React.Fragment>
                <Router>
                    <nav className="navbar navbar-expand-lg navbar-light bg-dark">
                        <Link style={{color:"white"}} className="navbar-brand"  to="/" >
                            UrCV    
                        </Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav navbar-right mr-auto">
                            {/* <li className="nav-item">
                                    <a  className="nav-link" href={`https://github.com/login/oauth/authorize?client_id=ed386413882419f33d05&scope=public_repo`}>Go to git</a>
                                </li> */}
                                <li className="nav-item">
                                    <Link  style={{color:"white"}} className="nav-link" to="/design">MakeCV<span className="sr-only">(current)</span></Link>
                                </li>
                                <li>
                                    {this.isloggedin()}
                                </li>
                                <li className="nav-item">
                                    <Link  style={{color:"white"}}  className="nav-link" to='/test/Actor'>Where the link is the route will be</Link>
                                </li>
                                <li className="nav-item">
                                    <Link  className="nav-link" to={`/template/test`}>Template-Test</Link>
                                </li>


                            </ul>
                        </div>
                    </nav>
                    <Switch>
                        <Route exact path='/templates' component={()=>{
                            console.log(window.location.pathname);
                            return(
                                <div>Templates</div>
                            )
                        }}>
                        </Route>
                        <Route exact path='/examples' component={()=>{
                            console.log(window.location.pathname);
                            return(
                                <div>Examples
                                    <input type="text" value="Already broken" readOnly={false}  onClick={()=>{this.value="CHanged"}}/>
                                </div>
                            )
                        }}>
                        </Route>
                        <Route exact path='/' component={()=>{
                            console.log(window.location.pathname);
                            return(
                                <div>Home</div>
                            )
                        }}></Route>
                        <Route exact path='/design' component={()=>{
                            console.log(window.location.pathname);
                            return(
                                <div>Design</div>
                            )
                        }}></Route>
                        {/* <Route exact path='/thetest' component={obj["Dev"]}>
                        </Route> */}
                        {/* <Route exact path='/test/Dev1' component={()=><App number={'1'}/>}>
                        </Route>
                        <Route exact path='/test/Dev2' component={()=><App number={'2'}/>}>
                        </Route> */}
                        {/* <Route exact path='/test/:prof' component={(props)=> <Template {...props}/>}>
                        </Route> */}
                        <Route exact path='/workings' component={CustomTextInput}>
                        </Route>
                        <Route exact path='/template/test' component={Trial}>
                        </Route>
                        <Route exact path='/deploy'></Route>
                        {/* <Route exact path='/gitauth' component={Git}>
                        </Route> */}

                        
                        
                    </Switch>
                    </Router>
            </React.Fragment>
         );
    }
}


class CustomTextInput extends React.Component {
    constructor(props) {
      super(props);
      // create a ref to store the textInput DOM element
      this.textInput = React.createRef();
      this.focusTextInput = this.focusTextInput.bind(this);
    }
  
    focusTextInput() {
      // Explicitly focus the text input using the raw DOM API
      // Note: we're accessing "current" to get the DOM node
      this.textInput.current.focus();
    }
  
    render() {
        console.log(this.textInput)
      // tell React that we want to associate the <input> ref
      // with the `textInput` that we created in the constructor
      return (
        <div>
          <input
            type="text"
            ref={this.textInput} defaultValue="tara"/>
          <input
            type="button"
            value="Focus the text input"
            onClick={this.focusTextInput}
          />
        </div>
      );
    }
  }

export default Navbar;