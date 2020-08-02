import React, { Component } from 'react';
import SkillsEditor from './SkillsEditor'
import MenuEditor from './MenuEditor'
import ContainerEditor from './ContainerEditor'
class Editor extends Component {
    constructor(){
        super();
        this.state={}
    }

    displayEditor=()=>{
        console.log(this.props.component)
        if(this.props.type==='skill')
            return(
                <SkillsEditor >

                </SkillsEditor>
            )

        else if(this.props.type==='container')
                return(
                    <ContainerEditor>

                    </ContainerEditor>
                )

        else if(this.props.type==='menu')
                    return(
                        <MenuEditor>

                        </MenuEditor>
                    )

    }

    render() { 
        return ( 
            <React.Fragment>
                {this.displayEditor()}
            </React.Fragment>
         );
    }
}
 
export default Editor;