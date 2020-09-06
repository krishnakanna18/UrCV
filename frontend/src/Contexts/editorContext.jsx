import React, { Component,useContext } from 'react';
import { createContext } from 'react';

const editorContext=createContext();

class EditorProvider extends Component{
    constructor() {
        super();
        this.state={ enabled:false,
            index:"",
            type:""}
        
    }
    

    render(){
        return (
            <editorContext.Provider>
                {this.props.children}
            </editorContext.Provider>
        )
    }
}