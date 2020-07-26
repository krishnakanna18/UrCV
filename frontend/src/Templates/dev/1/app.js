import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '../../../../public/index.css'
import debounce from 'lodash.debounce';
import {
	BrowserRouter as Router,
	// Route,
	// Link,
	// Switch
  } from "react-router-dom";
// import Popper from 'popper.js'
class Editor extends Component{
	constructor(props){
		super(props);
		this.state={container:this.props.container};
		// this.showEditor();
	}

	showEditor=()=>{
		
			document.getElementById("editorID").style.display="inline"
			document.getElementById("editorID").classList.add("col-lg-2");
			document.getElementById("siteID").classList.remove("col-lg-10");
			document.getElementById("siteID").classList.add("col-lg-9");		
		// this.setState({enabled:!this.state.enabled})

	}
	disableEditor=()=>{ 
		document.getElementById("editorID").style.display="none"
		document.getElementById("editorID").classList.remove("col-lg-2");
		document.getElementById("siteID").classList.add("col-lg-10");
		document.getElementById("siteID").classList.remove("col-lg-9");
	}
	handleChange=(e,keyf)=>{
		// debounce(()=>{
			const{
				cid,iid
			}=this.props;
		// 	console.log(indices);
		// 	this.props.changed(indices.cid,indices.iid,value)
		// },200)
		this.props.changed(cid,iid,keyf,e.target.value)

	}
	// setSize=(e)=>{
	// 	const{
	// 		cid,iid
	// 	}=this.props;
	// 	this.props.changeSize(cid,iid,e.target.value)
	// }
	
	render(){
		this.showEditor();
		const{
			container
		}=this.props
		let initial=container.Title!=undefined?container.Title:""
		let isub=container.Sub!=undefined?container.Sub:""
		return(
			<React.Fragment>
				<div onClick={this.disableEditor}  style={{textAlign:"end"}}>
					x
				</div>
				<div className="container-fluid">
					<label htmlFor="fontSize">
						Text Size
					</label>
					{/* <input type="text" name="fontSize" onChange={(e)=>{this.setSize(e)}}></input> */}

				</div>
				<div className="container-fluid">
				{container.Title!=""?<React.Fragment><label htmlFor="title">Title</label><input type="text" name="title"  onChange={(e)=>this.handleChange(e,"Title")}   value={`${initial}`}/></React.Fragment>:""}
				</div>
				<div className="container-fluid">
				{container.Sub!=""?<React.Fragment><label htmlFor="sub">Sub</label><input type="text" name="sub"  onChange={(e)=>this.handleChange(e,"Sub")}   value={`${isub}`}/></React.Fragment>:""}
				</div>
				
			</React.Fragment>
		)
	}

	
}
class App extends Component {
	constructor(){
		super();
		this.state={Site:"",fetched:false,editor:{
			cid:-1,
			iid:-1
		},
			isloading:false
			}
		
	}
	
	async componentDidMount(){
		let res=await fetch(`http://localhost:9000/sites/${this.props.number}`);
		let site=await res.json();
		console.log(site._id);
		this.setState({Site:site,fetched:true});
	}
	menuDisplay=()=>{
		let {menu}=this.state.Site;
		return (  
            <React.Fragment>
                {menu.map((option,index)=>{
                    return (<li key={index} className="nav-item">
								<a style={{color:"white"}} className="nav-link" href={option.href}>{option.title}</a>
                            </li>)
                })}
            </React.Fragment>
        );
	}
	changed=async (cid,iid,keyf,value)=>{
		let site=this.state.Site;
		if(value===undefined || value.length===0){
			site.Containers[cid].Inner[iid][keyf]=" ";
		}
		else
			site.Containers[cid].Inner[iid][keyf]=value;
			console.log(this.state.isloading,site.Containers[cid].Inner[iid][keyf],"DEBUGGING")
		
		this.setState({Site:site},debounce(()=>{
			if(this.state.isloading)
				return;
			else
				this.postData()

		},10));
		// debounce(()=>{
		// 	if(this.state.isloading)
		// 		return;
		// 	this.setState({Site:site},this.postData);
		// },10);
	
	}
	// changeSize=(cid,iid,value)=>{
	// 	let site=this.state.Site;
	// 	site.Containers[cid].Inner[iid].

		

	// }
	postData=async()=>{
		const {
			Site
		}=this.state;
		this.setState({isloading:true},debounce(async()=>{
			try{
			const res=await fetch(`http://localhost:9000/update/${Site._id}`,{
				method:"POST",
				body:JSON.stringify(Site),
				mode: 'cors', // no-cors, *cors, same-origin
				headers: {
					'Content-Type': 'application/json'
					// 'Content-Type': 'application/x-www-form-urlencoded',
				  }
			});
			const parsed=await res.json();
			console.log(parsed,"Prased");
			this.setState({isloading:false},()=>{
				// console.log("I Chabge it")
			});
			}
			
			catch(err){
				this.setState({isloading:false},()=>{
					// console.log("I Chabge it")
				});

			}
			// console.log("Executed i")
			
						
		}),10);
		


	}

	setEditor(cid,iid=-1){
		this.setState({editor:{enabled:true,cid:cid,iid:iid}})

	}
	enableEditor(){
		const {editor,Site:{Containers}}=this.state;
		if(editor.cid!=-1){
			return ( <Editor container={Containers[editor.cid].Inner[editor.iid]} cid={editor.cid} iid={editor.iid} changed={this.changed}/>)
		}

	}

	renderSite(){
		let Content=this.state.Site.Containers;
		return(
		<React.Fragment>
		<div className="row">
		<div id="editorID" className="container-fluid" style={{display:"block",borderRight:"1px solid"}}>
			{this.enableEditor()}
		</div>
		<Router>
		<div id="siteID" className="container-fluid col-lg-10 col-md-9 mt-5">
            <div id="topcontainer"  className="container-fluid" style={{marginTop:"0.1rem",backgroundImage:"https://html.nkdev.info/skylith/assets/images/promo-bg-1.jpg"}}>
				<div className="container-fluid" id="innertop">
					<nav onClick={this.menuEditor}  className="navbar sticky-top navbar-dark navbar-expand-lg">
						<div className="container-fluid" >
							<a style={{color:"white"}} className="navbar-brand" href="#items" ><img src={this.state.Site.avatar}></img></a>
							<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#InnernavbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
							<span className="navbar-toggler-icon navbar"></span>
							</button>
							<div className="collapse justify-content-end  navbar-collapse" id="InnernavbarSupportedContent">
								<ul  className="navbar-nav ">
									{this.menuDisplay()}
								</ul>
							</div>
						</div>
					</nav>
					<div id="Ctop" className="container-fluid"  style={{marginTop: "-3%"}}>
						<div className="row">
							<div id="Ctop.left" onClick={()=>this.setEditor(0,0)}  className="col-lg-6 col-xs-12" style={{paddingTop: "10%",paddingLeft: "15%", textAlign: "center"}}>
									<h1 className="display-4 xs-display-5g"
									style={{fontFamily: 'Alfa Slab One',fontSize:"40px"}}>
									{Content[0].Inner[0].Title}
									</h1>									
									<p>
									{Content[0].Inner[0].Sub}
									</p>
									<button className="btn " style={{backgroundColor :"#296e00", width: "40%"}} >Purchase Now</button>
							</div>
							<div id="Ctop.right" onClick={()=>this.setEditor(0,1)} className="col-lg-6 col-xs-12" >
									<img  src={Content[0].Inner[1].img} className="img-fluid" alt=""></img>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div id="0" className="container-fluid mt-5 pt-5 editz">
				<div  className="row" style={{backgroundImage:this.state.Site.Containers[0].bgImage}}>
					<div id="00"  onClick={()=>this.setEditor(0,0)} className="container" style={{textAlign:"center"}}>
						<div className="col-xs-12">
							<div className="display-3">
								<span>{Content[0].Inner[0].Title}</span>
							</div>
							<h1 className="display-4">
								{Content[0].Inner[0].Sub}
							</h1>
							<h6 className="mt-4">
								{Content[0].Inner[0].Desc}
							</h6>
						</div>
					</div>
				</div>
			</div>
			<div id="12" className="container col-lg-12 col- mt-5 pt-4 d-flex">
				<ul className="list-group mx-auto justify-content-center list-group-horizontal">
					<li className="list-group-item">ALL</li>
					<li className="list-group-item">AGENCY</li>
					<li className="list-group-item">PORTFOLIO</li>
					<li className="list-group-item">PHOTOGRAPHY</li>
					<li className="list-group-item">ONE PAGE</li>
					<li className="list-group-item">SHOP</li>
					</ul>
			</div>
			<div id="1"  className="container-fluid mt-5 pt-5 editz">
				<div className="row">
					<div id="10" onClick={()=>this.setEditor(1,0)} className="mt-5 col-lg-4 col-md-6 col-sm-12">
						<img className="img-fluid" src={Content[1].Inner[0].img}></img>
						<br></br>
						<h3>{Content[1].Inner[0].Title?Content[1].Inner[0].Title:""}</h3>
						<h5>{Content[1].Inner[0].Sub}</h5>
					</div>
					<div id="11" onClick={()=>this.setEditor(1,1)} id="items" className="mt-5 col-lg-4 col-md-6 col-sm-12">
					<img className="img-fluid" src={Content[1].Inner[1].img}></img>
						<br></br>
						<h3>{Content[1].Inner[0].Title?Content[1].Inner[1].Title:""}</h3>
						<h5>{Content[1].Inner[1].Sub}</h5>

					</div>
					<div id="2" onClick={()=>this.setEditor(1,2)} className="mt-5 col-lg-4 col-md-6 col-sm-12">
					<img className="img-fluid" src={Content[1].Inner[2].img}></img>
						<br></br>
						<h3>{Content[1].Inner[0].Title?Content[1].Inner[2].Title:""}</h3>
						<h5>{Content[1].Inner[2].Sub}</h5>
					</div>	
				</div>
				
			</div>
		</div>
		</Router>
		</div>
		</React.Fragment>
		)
	}
    render() { 
		let Site=this.state.Site;
		console.log(Site,"This time");
		// console.log(Site)
        return (  	
			<React.Fragment>
			{this.state.fetched===true?this.renderSite():null}	
			</React.Fragment>
			
        );
    }
}
 
export default App;