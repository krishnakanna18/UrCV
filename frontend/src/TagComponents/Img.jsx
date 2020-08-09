import React, { Component } from 'react';
class Img extends Component{
    render(){
        let classes=""
        let style={}
        if(this.props.classes!==undefined)
            classes=`${this.props.classes.join(' ')}`
        if(this.props.styles!==undefined)
            style=this.props.styles
        return(
            <img src={`${this.props.contents.src}`} alt="Verify" style={style} className={`${classes}`} id={`${this.props.index}`} 
                // onMouseEnter={(e)=>{
                // console.log(e.target)
                // }}
            >
            </img>
        )
    }
}
export default Img
