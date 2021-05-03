import React, { Component } from 'react';
import ContainerEditor from './ContainerEditor'
class ProjectEditor extends Component {
    state = {  }
    render() { 
    //    console.log(this.props)
        return (  
            <React.Fragment>
                <div>
                    <ContainerEditor    key={`${this.props.index}:project`}
                                        component={this.props.component} 
                                        index={this.props.index} 
                                        removeElement={this.props.delete}
                                        moveElement={this.props.move}
                                        modifyElement={this.props.modify}>
                                        addElement={this.props.insert}
                    </ContainerEditor>
                </div>
            </React.Fragment>
        );
    }
}
 
export default ProjectEditor;