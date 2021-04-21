import React, { Component } from 'react';
import SkillsEditor from './SkillsEditor'
import MenuEditor from './MenuEditor'
import ContainerEditor from './ContainerEditor'
import ProjectEditor from './ProjectEditor'
import '../css/Editor.css'
import '../css/modal.css'
import { withRouter } from 'react-router-dom'
import ReactDOM from 'react-dom';
import Modal from './ModalEditor';

class Editor extends Component {
    constructor(){
        super()
        this.state={owner:"",
        insertModal:false,
        pos:0
        },
        this.disableOverlay=this.disableOverlay.bind(this),
        this.insertContainer=this.insertContainer.bind(this)

    }


    setOwner=()=>{
        if(this.props.type==='skills'){
            return 'SKILLS'
        }
        else if(this.props.type==='container')
        {
            return 'CONTAINER'
        }
        else if(this.props.type==='menu'){
            return 'MENU'
        }

    }


    displayEditor=()=>{
        if(this.props.type==='skills'){
            return(
                <SkillsEditor component={this.props.component} 
                              index={this.props.index} 
                              removeSkill={this.props.delete}
                              moveSkill={this.props.move}
                              addSkill={this.props.insert}
                              skillModel={this.props.models.skillTemplate}
                >
                    
                </SkillsEditor>
            )
        }

        else if(this.props.type==='container')
        {
                return(
                    <ContainerEditor key={`${this.props.index}`}
                                    component={this.props.component} 
                                     index={this.props.index} 
                                     removeElement={this.props.delete}
                                     moveElement={this.props.move}
                                     modifyElement={this.props.modify}
                                     >
                        
                    </ContainerEditor>
                )
                }
        else if(this.props.type==='menu'){
                    return(
                        <MenuEditor>

                        </MenuEditor>
                    )
        }
        else if(this.props.type==="project"){

                return (
                    <ProjectEditor  key={`${this.props.index}`}
                                    component={this.props.component} 
                                    index={this.props.index} 
                                    removeElement={this.props.delete}
                                    moveElement={this.props.move}
                                    modifyElement={this.props.modify}
                                    addElement={this.props.insert}
                    >

                    </ProjectEditor>
                )

        }

    }


    removeElement=(index)=>{
            this.props.delete(index)
    }

    moveElement=(index,pos)=>{
        this.props.move(index,pos)
    }

    addContainer(pos){
        this.setState({insertModal:true,pos})
    }

    insertContainer(component){
        let index=String(parseInt(this.props.index)+this.state.pos)
        this.props.insert(-1,component,index)


    }
    // enableOverlay(){
    //     this.setState({insertModal:true})
    // }

    disableOverlay(){
        this.setState({insertModal:false})
    }



    modalRender(){
        ReactDOM.render(
            <Modal  index={this.props.index}
                    templateId={this.props.templateModelId}
                    key={this.props.index}
                    closeModalParent={this.disableOverlay}
                    jsonToHtml={this.props.jsonToHtml}
                    insertContainer={this.insertContainer}
                    >
            </Modal>,
            document.getElementById('modalRoot')
          );
    }

    render() { 
        let {index}=this.props
        let owner=this.setOwner()
        return ( 
            <React.Fragment key={index}>
                {this.state.insertModal===true?
                    this.modalRender()
                :""}
                <div className="d-flex flex-column  header" >
                    <div className="mt-5  row justify-content-between" style={{}}>
                        <div className="offset-1 monospace font-weight-bold">
                            {owner}
                        </div>
 
                        <div className="d-flex col justify-content-end" >
                            <div className="dropdown">
                                <button className="btn " type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <img className="img-fluid" alt="Alt" src="http://localhost:3000/icons/more.png"/>
                                </button>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">

                                    {/* Remove the component */}
                                    <button  className="btn dropdown-item " type="btn"  style={{  padding: 0,border:"none"}}  onClick={()=>this.removeElement(`${index}`)}>
                                            <span className="pl-3">
                                                <img className="img-fluid" alt="Alt" src="http://localhost:3000/icons/multiply.png"/>
                                                    Remove 
                                            </span> 
                                    </button>
                                    <button  className="btn dropdown-item " type="btn"  style={{  padding: 0,border:"none"}}
                                    onClick={()=>{this.addContainer(0)}}
                                     >
                                        <span className="pl-3">
                                            <img alt="Alt" src="http://localhost:3000/icons/plus-math.png"/>
                                            Add a container Above
                                        </span>
                                    </button>

                                    <button  className="btn dropdown-item " type="btn"  style={{  padding: 0,border:"none"}}
                                    onClick={()=>{this.addContainer(1)}}
                                    >
                                        <span className="pl-3">
                                            <img alt="Alt" src="http://localhost:3000/icons/plus-math.png"/>
                                            Add a container Below
                                        </span>
                                    </button>


                                    <button  className="btn dropdown-item " type="btn"  style={{  padding: 0,border:"none"}} onClick={()=>this.moveElement(`${index}`,-1)} >
                                        <span className="pl-3">
                                            <img className="img-fluid" alt="Alt" src="http://localhost:3000/icons/up.png"/>
                                            Move Up
                                        </span>
                                    </button>

                                    <button  className="btn dropdown-item " type="btn"  style={{  padding:0,border:"none"}} onClick={()=>this.moveElement(`${index}`,+1)}>
                                        <span className="pl-3">
                                            <img className="img-fluid" alt="Alt" src="http://localhost:3000/icons/down.png"/>
                                            Move down
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="font-weight-bold"  style={{marginLeft:"", marginTop:"3%"}}>
                            <button type="button" className="close" aria-label="Close"  onClick={()=>this.props.disableEditor()}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="mt-5 pt-2">
                         {this.displayEditor()}
                </div>
            </React.Fragment>
         );
    }
}
 
export default withRouter(Editor);