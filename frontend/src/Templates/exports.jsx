import React,{Component} from 'react';
import  Dev from './dev/1/app';
import Actor from './actor/app';
const obj={Dev,Actor};
class  Template extends Component {
    constructor(){
        super();
        this.state={Site:""}
        
    }
 
    render() { 
        console.log(this.props);
        const {match:{params}}=this.props;
        const Temp=obj[params["prof"]];
        return ( 
            <React.Fragment>
            <Temp/>
            </React.Fragment>
         );
    }
}
 
export default Template; 