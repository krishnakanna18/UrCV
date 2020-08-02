import React, { Component } from 'react';
class Div extends Component{
    render(){
        let classes=""
        let style={}
        if(this.props.classes!==undefined)
            classes=`${this.props.classes.join(' ')}`
        if(this.props.styles!==undefined)
            style=this.props.styles

            // console.log(this.props.index,"SKill")
        if(!this.props.index.includes(":") )
            return(
                <div className={`${classes}`} id={`${this.props.index}`} onClick={()=>this.props.enableEditor(this.props.index,classes)} style={style}>
                    {this.props.children}
                </div>
            )
            return(
                <div className={`${classes}`} id={`${this.props.index}`}   style={style}>
                    {this.props.children}
                </div>
            )
        
       
    }
}

export default Div
