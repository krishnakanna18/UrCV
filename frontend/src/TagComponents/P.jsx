import React, { Component } from 'react';
import '../../public/pHover.css'
class P extends Component{
    
    showOptions(e,isParent){
        if(isParent)
        {   e.target.classList.add("pHover")
            e.target.style.backgroundColor="rgba(135, 206, 360,0.5)"
            e.target.setAttribute("data-toggle","tooltip")
            e.target.setAttribute("data-placement","bottom")
            e.target.setAttribute("title","Tooltip on bottom")
            // style={...style,"backgroundColor"}
        }
    }

    hideOptions(e,isParent){
        if(isParent)
        {   e.target.style.backgroundColor="transparent"
        }
    }

    
    render(){
        // console.log(`I'm ${this.props.index} and im a text`);
        let classes=""
        let style={}
        if(this.props.classes!==undefined)
            classes=`${this.props.classes.join(' ')}`
        if(this.props.styles!==undefined)
            style=this.props.styles
        let isParent=this.props.editorIndex===this.props.index.split(':')[0]
        // console.log(isParent)
        return(
            <p className={`${classes}`}  style={style} id={`${this.props.index}`} 
                onMouseEnter={(e)=>{ this.showOptions(e,isParent)}}
                onMouseLeave={(e)=>{this.hideOptions(e,isParent)}}
                >
                {this.props.contents.text}
                {this.props.children}
            </p>
        )
    }
}

export default P