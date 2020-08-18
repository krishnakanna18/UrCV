import React, { Component } from 'react';

class Link extends Component{
    
    render(){
        let classes=""
        let style={},href="javascript:void(0)",target="",text=""
        if(this.props.classes!==undefined)
            classes=`${this.props.classes.join(' ')}`
        if(this.props.styles!==undefined)
            style=this.props.styles
        if(this.props.contents.href!==undefined)
            href=this.props.contents.href
        if(this.props.contents.text!==undefined)
            text=this.props.contents.text
        if(this.props.contents.target!==undefined)
            target=this.props.contents.target
        return(
            <a className={`${classes}`} style={style} id={`${this.props.index}`} href={`${href}`} target={`${target}`} >
                {`${text}`}
                {this.props.children}
            </a>
        )
    }
}

export default Link