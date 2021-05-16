import { toPairs } from 'lodash-es';
import React, { Component } from 'react';
import {
    Link,
  } from "react-router-dom";
import Template from './Template.jsx'
import '../css/viewTemplates.css'

class Templates extends Component {
    componentDidMount(){
        console.log("Mounted Templates")

    }
    componentWillUnmount(){
        console.log("Unmounted Templates")
    }
    render() { 
        let {templates}=this.props
        
        return (
            <React.Fragment>
                <div className="mb-5">
                    <div className="pt-4 d-flex flex-row justify-content-between align-items-center intro" style={{backgroundColor:"white"}}>
                        <div className="row ml-5 pt-1 pb-1">
                            <div className="d-flex flex-column">
                                <p className="profileHeader">Pick the Template you love</p>
                                <p className="mt-n3">Click on a template to edit it.</p>
                            </div>
                        </div>
                        <div className="row justify-content-center align-items-center">
                        </div>
                    </div>
                    <div className="header" style={{fontFamily:"Calibri, San-Serif"}}>
                        All website templates
                    </div>
                    <div className="d-flex m-2 flex-lg-row flex-col flex-wrap  itemContainer justify-content-center">
                        {templates.map((template,id)=>{
                        return <Template template={template} key={id} 
                                loggedin={this.props.loggedin} user={this.props.user}
                                updateUser={this.props.updateUser}
                                history={this.props.history} 
                        ></Template>
                        })}
                    </div>
                </div>
                
            </React.Fragment>
          );
    }
}


 
export default Templates;