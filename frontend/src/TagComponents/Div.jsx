import React, { Component } from 'react';
class Div extends Component{
    render(){
        console.log(this.props.key,"DIV KEY")
        let classes=""
        let style={}
        if(this.props.classes!==undefined)
            classes=`${this.props.classes.join(' ')}`
        if(this.props.styles!==undefined)
            style=this.props.styles

            // console.log(this.props.index,"SKill")
        if(this.props.index.includes(":") )
            return(
                <div className={`${classes}`} id={`${this.props.index}`}   style={style}>
                    {this.props.children}
                </div>
                )
        return(
            <div className={`${classes}`} id={`${this.props.index}`}  
                onMouseEnter={()=>{
                    // this.props.enableOverlay(this.props.index)
                    let comp=document.getElementById(this.props.index)
                    comp.classList.add('overlay')
                }} 
                onMouseLeave={()=>{
                    // this.props.disableOverlay(this.props.index)
                    let comp=document.getElementById(this.props.index)
                    comp.classList.remove('overlay')
                }}
                onClick={()=>this.props.enableEditor(this.props.index,classes)} style={style}>
                {this.props.children}
            </div>
        )
        
       
        
       
    }
}

export default Div
