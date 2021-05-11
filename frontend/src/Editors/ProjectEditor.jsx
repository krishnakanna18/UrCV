import React, { Component } from 'react';
import ContainerEditor from './ContainerEditor'
class ProjectEditor extends Component {
    constructor(props){
        super(props);
        this.state={sampleTech:{}}
    }
    
    findProjectTemplate=(cur,template)=>{
        if(cur===undefined || cur===null) return undefined;
        if(cur.tag==="div" && cur.classlist.includes("project")){
            template["project"]=cur
            return 
        }
        if(cur.children===undefined || cur.children===null || cur.children.length==0)
            return;
        for(let child of cur.children)
            this.findProjectTemplate(child,template)
    }

   
    render() { 
        let template={"project":{}}
        this.findProjectTemplate(this.props.component,template)
        return (  
            <React.Fragment>
                <div >
                    <ContainerEditor    key={`${this.props.index}:project`}
                                        component={this.props.component} 
                                        index={this.props.index} 
                                        removeElement={this.props.delete}
                                        moveElement={this.props.move}
                                        modifyElement={this.props.modify}
                                        addElement={this.props.insert}
                                        projectTemplate={template["project"]}
                                        type={"project"}>
                    </ContainerEditor>
                </div>
            </React.Fragment>
        );
    }
}
 
export default ProjectEditor;