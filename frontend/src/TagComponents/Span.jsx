import React, { Component } from 'react';
class Span extends Component{
    
    render(){
        let classes=""
        let style={}
        if(this.props.classes!==undefined)
            classes=`${this.props.classes.join(' ')}`
        if(this.props.styles!==undefined)
            style=this.props.styles
        return(
            <span className={`${classes}`} style={style} id={`${this.props.index}`} >
                {this.props.contents.text}
                {this.props.children}
            </span>
        )
    }
}
export default Span