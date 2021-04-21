import React, { Component } from 'react';
import '../css/modal.css'
import { withRouter } from 'react-router-dom'

class addContainer extends Component {
  
    render() { 
        return ( 
            <div className="Modal">
                <div>
                    Yes modal working
                </div>
            </div>
         );
    }
}
 
export default withRouter(addContainer);