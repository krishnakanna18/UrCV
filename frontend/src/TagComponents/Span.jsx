import React, { Component } from 'react';
class Span extends Component{
    
    shouldComponentUpdate(nextProps,nextState){
        // if(this.props.index.indexOf(this.props.editorIndex)===0 || this.props.index.indexOf(nextProps.editorIndex)===0 || ((this.props.index.indexOf(this.props.ur_stack_id)===0) || this.props.index.indexOf(nextProps.ur_stack_id)===0) && this.props.ur_stack_id.length>0 ){
            
        //     return 1;
        // }
        return 1;
    }

    render(){
        // console.log(`I'm ${this.props.index} and im a text`);
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