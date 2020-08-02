import React, { Component } from 'react';

class P extends Component{
    
    render(){
        let classes=""
        let style={}
        if(this.props.classes!==undefined)
            classes=`${this.props.classes.join(' ')}`
        if(this.props.styles!==undefined)
            style=this.props.styles
        return(
            <p className={`${classes}`}  style={style} id={`${this.props.index}`} >
                {this.props.contents.text}
                {this.props.children}
            </p>
        )
    }
}

export default P