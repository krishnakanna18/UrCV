import React, { Component } from 'react';
import '../../public/containerEditor.css'
class Container extends Component {
    constructor(props){
        super(props);
        this.state={ innerPage:{
            enabled:false,
            index:""
        } }
    }

    enableInner=(index)=>{
        this.setState({innerPage:{enabled:true,index}})
    }

    disableInner=()=>{
        this.setState({innerPage:{enabled:false,index:""}})

    }

    displayInner=()=>{
        let {innerPage:{index}}=this.state
        let innerComponent={...this.props.component.children[index]}
        console.log(innerComponent)
        return(<React.Fragment>
                    <div className="row  mt-n2 justify-content-start">
                        <div className="col offset-n2">
                            <button className="btn"  onClick={()=>this.disableInner()}><img src="https://img.icons8.com/ios/50/000000/undo.png"   style={{width:"22px"}}  alt="REAL"   className="img-fluid"/> </button><span className="ml-n2">Back</span>
                        </div>
                    </div>

        </React.Fragment>
        )
    }

    //Remove an element at the given index -- index:tree index
    removeElement=(index)=>{
        // console.log(index)
        let res=this.props.removeElement(index)
        if(res===0)
        {   
            console.log(index)
        }
        
    }

    //Move an element at the given index by pos -- index:tree index
    moveElement=(index,pos)=>{
        // console.log(index)
        this.props.moveElement(index,pos)
    }


    //Display the list of components present in the outer container
    displayOuter=()=>{
            let components=[...this.props.component.children]
            let index=this.props.index
            // console.log(index)
            return( 
                    <div className="mt-4 d-flex flex-column">
                        {components.map((component,id)=>{
                            return(
                            <div key={`${id}`} className="mt-2 mb-2 pt-2 pb-2 d-flex flex-row justify-content-between align-contents-center" style={{backgroundColor:"#F5FFFA"}}
                                 onMouseEnter={()=>{let a=1;}}
                            >
                                <div className="col" 
                                     
                                     onClick={()=>{this.enableInner(id)}}
                                 >
                                    {`Container ${id}`} 
                                </div>

                                <div className="d-flex col justify-content-end" >
                                    <div className="dropdown">
                                        <button className="btn " type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <img className="img-fluid" alt="Alt" src="https://img.icons8.com/ios/24/000000/more.png"/>
                                        </button>
                                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">

                                            {/* Add a section above ----  To be added in later versions*/} 
                                            {/* <button  className="btn dropdown-item " type="btn"  style={{  padding: 0,border:"none"}}  onClick={()=>this.setAddPos(index,-1)}>
                                                <span className="pl-3">
                                                    <img alt="Alt" src="https://img.icons8.com/ios/24/000000/plus-math.png"/>
                                                    Add skill Above
                                                </span>
                                            </button> */}

                                            {/* Remove the component */}
                                            <button  className="btn dropdown-item " type="btn"  style={{  padding: 0,border:"none"}}  onClick={()=>this.removeElement(`${index}:${id}`)}>
                                                    <span className="pl-3">
                                                        <img className="img-fluid" alt="Alt" src="https://img.icons8.com/ios/24/000000/multiply.png"/>
                                                            Remove 
                                                    </span> 
                                            </button>

                                              {/* Move Above button */}
                                              {id>0?
                                                    <button  className="btn dropdown-item " type="btn"  style={{  padding: 0,border:"none"}} onClick={()=>this.moveElement(`${index}:${id}`,-1)} >
                                                        <span className="pl-3">
                                                            <img className="img-fluid" alt="Alt" src="https://img.icons8.com/ios/24/000000/up.png"/>
                                                            Move Up
                                                        </span>
                                                    </button>
                                                    :""
                                                }


                                                {/* Move down button */}
                                                {id<components.length-1?
                                                <button  className="btn dropdown-item " type="btn"  style={{  padding:0,border:"none"}} onClick={()=>this.moveElement(`${index}:${id}`,+1)}>
                                                    <span className="pl-3">
                                                        <img className="img-fluid" alt="Alt" src="https://img.icons8.com/ios/24/000000/down.png"/>
                                                        Move down
                                                    </span>
                                                </button>
                                                :""
                                                }


                                        </div>
                                    </div>
                                </div>
                            <hr className="hr"></hr>
                        </div>
                            )
                        })}
                    </div>
                )

    }

    render() { 
        return ( 
                <React.Fragment>
                    {this.state.innerPage.enabled===false?this.displayOuter():""}
                    {this.state.innerPage.enabled===true?this.displayInner():""}
                </React.Fragment> 
        );
    }
}
 
export default Container;