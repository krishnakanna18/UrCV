import React, { Component } from 'react';

class Link extends Component{
    
    render(){
        let classes=""
        let style={}
        if(this.props.classes!==undefined)
            classes=`${this.props.classes.join(' ')}`
        if(this.props.styles!==undefined)
            style=this.props.styles
        return(
            <a className={`${classes}`} style={style} id={`${this.props.index}`} href={`${this.props.href}`} >
                {this.props.contents.text}
                {this.props.children}
            </a>
        )
    }
}

export default Link