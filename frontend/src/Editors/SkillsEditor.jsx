import React, { Component } from 'react';
class Skillset extends Component {
    constructor(){
        super();
        this.state={cur_skills:{},global_skills:{}}
    }

    componentDidMount=async()=>{
        let tools=await fetch ('http://localhost:9000/tools')
        let skills=tools.json()
        this.setState({global_skills:skills})
    }
    
    render() { 
        return ( 
            <div></div>
         );
    }
}
 
export default Skillset;