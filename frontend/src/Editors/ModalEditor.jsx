import React, { Component } from 'react';
import { renderToStaticMarkup } from "react-dom/server"
import '../css/modal.css'
class Modal extends Component {
    constructor(){
        super()
        this.state={containers:[],templates:[]}
        this.closeModal=this.closeModal.bind(this)
    }
    async componentDidMount(){
        document.getElementById('modalRoot').style.display="block"
        document.getElementById('modalRoot').style.backgroundColor="#AAFFFF"
        document.getElementById('root').style.opacity="0.2"
        document.getElementById('root').style.pointerEvents="none"

        let res=await fetch('http://localhost:9000/template/containers/'+this.props.templateId,{
            method:"get",
            credentials:"include"
        })
        res=await res.json()
        let containers=res.containers.map(container=>this.props.jsonToHtml(container))
        this.setState({containers:containers, templates:res.containers})
    }

    closeModal(){

        document.getElementById('modalRoot').style.display="none"
        document.getElementById('root').style.opacity="1"
        document.getElementById('root').style.pointerEvents="auto"
        this.props.closeModalParent()

    }

    componentWillUnmount(){
        document.getElementById('modalRoot').style.display="none"
        document.getElementById('root').style.opacity="1"
        document.getElementById('root').style.pointerEvents="auto"
    }

    addContainerParent(container){
        this.props.insertContainer(container)
        this.closeModal()
    }
    
    render() { 
        let {containers}=this.state
        return ( 
            <div>
                <div className="Modal d-flex flex-column overflow-auto">
                    <div className="">
                        <button type="btn" className="close" onClick={()=>{
                                    this.closeModal()
                                }
                            }
                            style={{position:"absolute", top:"2%",right:"2%"}}
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    <div className="" >
                        <div className="d-flex flex-row justify-content-start flex-lg-wrap container ">
                        {containers.map((container,id)=>{
                            return <React.Fragment>
                                <div className="mt-4 mb-4  col-12 parent addContainerOverlay" key={id} style={{    zoom: "0.4"}} 
                                    onClick={(e)=>{
                                            this.addContainerParent(this.state.templates[id])
                                        }}
                                    >
                                        {container}
                                </div>
                                {id===containers.length-1?"":<hr  className="col-12" />}
                                
                            </React.Fragment>
                        }
                            )}
                        </div>
                    </div>

                </div>
            </div>
        ) 
    }
}
 
export default Modal;