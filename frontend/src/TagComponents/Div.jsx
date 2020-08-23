import React, { Component } from 'react';
import '../../public/editPanel.css'
class Div extends Component{

    //Check if the next selected component is same as the existing component
    shouldComponentUpdate(nextProps,nextState){

        //If the container is not a top level component
        if(this.props.index.includes(":") )
            return 1

        //The parent component of the selected component
        if(this.props.editorIndex===this.props.index && nextProps.editorIndex!==this.props.editorIndex)
                        {
                            let comp=document.getElementById(this.props.index)
                            comp.classList.remove('selected')
                            // comp.classList.remove('editPanel')
                            return 1
                        }
        return 1
    }
    
    render(){
        let classes=""
        let style={}
        if(this.props.classes!==undefined)
            classes=`${this.props.classes.join(' ')}`
        if(this.props.styles!==undefined)
            style=this.props.styles
        let parent=this.props.index.split(':')[0]

        if(this.props.index.includes(":")){
            return(
                <div className={`${classes}`} id={`${this.props.index}`}style={style}>
                        {this.props.children}
                </div>
            )   
        }
        let disabled=this.props.index===0?`disabled`:""
        classes=`divs ${classes}`
        // let divs=this.props.editorIndex===parent?'selected-div':""
        return(
        // <div className={`divs ${divs} mt-1 mb-1`}>
            <div className={`${classes}`} id={`${this.props.index}`}  
                onMouseEnter={()=>{
                    
                    if(this.props.editorIndex===parent)
                        return

                    // this.props.enableOverlay(this.props.index)
                    let comp=document.getElementById(this.props.index)
                    comp.classList.add('overlay')
                }} 
                onMouseLeave={()=>{
                    
                    // this.props.disableOverlay(this.props.index)
                    let comp=document.getElementById(this.props.index)
                    comp.classList.remove('overlay')
                }}
                onClick={()=>{

                    //If editor is already enabled return
                    if(this.props.editorIndex===parent)
                        return

                    this.props.enableEditor(this.props.index,classes)
                    let comp=document.getElementById(this.props.index)
                    comp.classList.add('selected')
                    // comp.classList.add('editPanel')

                }} style={style}>
                {this.props.children}
            </div>

            // <div className=" ">
            // {   
            //     this.props.editorIndex===parent ?
            //         <div className="d-flex flex-row justify-content-end editPanel">
            //             <div className="d-flex flex-row justify-content-around col">
            //                 <button className="btn" style={{backgroundColor:"white"}}>
            //                     <img src="https://img.icons8.com/ios/24/000000/edit.png"/> Edit
            //                 </button>
            //             </div>

            //             <div className="d-flex flex-row justify-content-center col">

            //                 <button className={`btn ${disabled}`} style={{backgroundColor:"white"}}>
            //                     <img src="https://img.icons8.com/android/24/000000/down.png"/>
            //                 </button>

            //                 <button className={`btn ${disabled}`} style={{backgroundColor:"white"}}>
            //                     <img src="https://img.icons8.com/ios/24/000000/up.png"/>
            //                 </button>

            //             </div>
            //         </div>:""
            //     }
            // </div>
        // </div>
        )
        
       
        
       
    }
}

export default Div

{/* <img src="https://img.icons8.com/ios/24/000000/edit.png"/> Edit icon*/ }