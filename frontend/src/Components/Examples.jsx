import React, { Component } from 'react';
class Example extends Component {
    constructor(){
        super();
        this.state={sites:[]};
    }
    componentDidMount(){
        fetch('http:localhost:9000/sites')
        .then(res=>res.json())
        .then(res=>{
            console.log(res);
        })
    }
    render() { 
        return (
            <div>Examples</div>
          );
    }
}
 
export default Example;
