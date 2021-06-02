import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Link,
  } from "react-router-dom";
import '../css/landingpage.css'
import MenuUI from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import TextEditor from '../Editors/TextEditor'
import ImgEditor from '../Editors/ImgEditor'
import { ButtonGroup } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save'
import PublishIcon from '@material-ui/icons/CloudUploadOutlined'
import {serverEndPoint} from '../config'

class Menu extends Component {

    constructor(){
        super();
        this.state={templateChoice:0, templateViews:[], editorComponent:"text"}    
    }

    isScrollAbove=()=>{
        var doc = document.getElementById("menuTopBackground");
        var bottom =window.pageYOffset;
        if(bottom <= 1000 || bottom===undefined || bottom===null) {
            return 0;
        }
        else return 1;
    }

    componentDidMount=async()=>{

        let {templates}=this.props
        let templateViews=[]
        await Promise.all(templates.map(async (template)=>{
            let res=await fetch(`${serverEndPoint}/template/html/`+template.id+'.html',{
                method:"get",
                credentials:"include"
            })
            let {status}=res
            res=await res.json()
            if(status===200)
                templateViews.push({html:res.html,name:template.name})
            console.log(template._id)
        }))
        this.setState({templateViews})
    }

    chooseView=(id)=>{
        this.setState({templateChoice:id})
        document.getElementById("codeDisplayInnerHtml").scrollTop=0
    }

    setEditorType=(type)=>{
        this.setState({editorComponent:type})
    }

    userMenu(){
        let btnStyle={}
        // if()
        if(!this.props.loggedin)
           return <li  className="nav-item" >
                  <Link className="nav-link" to={{
                      pathname:"/user/login",
                      state:{
                          params:{
                            redirect:'/'
                          }
                      }
                  }}>       
                            <Button className="menuSignInBtn" >
                               <span className="p-2 menuSignInBtnTxt">Sign in</span> 
                            </Button>
                      </Link> 
                </li>
             
        
        return <React.Fragment>
               <li  className="nav-item mr-3 ml-3"> 
                        <Link className="nav-link" to={{
                            pathname:'/user/profile',
                            state:{
                                user:this.props.user
                            }
                        }}>
                            <span classname="headerMenuPage originalLeftPg leftMenuPg" > Your Sites </span>
                            
                        </Link>
                </li>
                <li  className="nav-item" style={{left:"100%"}}>        
                    <div className="dropdown show">
                    <a className="btn btn-secondary" href="#" role="button" id="userMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{border:"none",background:"none"}}>
                        <AccountCircleIcon style={{width:"100px" }}></AccountCircleIcon>
                    </a>
                    <div className="dropdown-menu " aria-labelledby="userMenu" id="menu">
                        <Link className="dropdown-item col mr-2" to={{
                                            pathname:"/user/profile",
                                            state:{
                                                user:this.props.user
                                            }
                                        }}>
                            <svg viewBox="0 0 24 24" width="1em" height="1em" className="mr-3"><path fillRule="evenodd" d="M17 3c1.1 0 2 .9 2 2v16l-7-3-7 3 .01-16c0-1.1.89-2 1.99-2h10zm-5 10.43L14.472 15l-.656-2.96L16 10.048l-2.876-.256L12 7l-1.124 2.792L8 10.048l2.184 1.992L9.528 15 12 13.43z"></path>
                            </svg>
                        {this.props.user.username}
                        </Link>
                        <a className="dropdown-item col" onClick={async()=>await this.props.logoutUser()}  >
                        <svg viewBox="0 0 24 24" width="1em" height="1em" className="mr-3"><path fillRule="evenodd" d="M21 3.01a2 2 0 0 1 2 2v14c0 1.1-.9 1.98-2 1.98H10c-1.1 0-2-.88-2-1.98V15h2v4.02h11V4.99H10V9H8V5.01c0-1.1.9-2 2-2h11zM5 16l-4-4 4-4v3h10v2H5v3z"></path></svg>
                        Sign out</a> 
                    </div>
                </div>
                </li>
                </React.Fragment>  
    }

    editorComponentLanding=(comp)=>{
        if(comp==="text"){
           return <TextEditor domId="landingPageView"  classname="landingPageViewText" text={{tag:"p", contents:{'text':"Modify text to your needs. Supports rich text decoratin features. Over 100 google fonts supported. Choose the background color that goes well with your text. Lightning fast update to your page."}}} modifyText={(e)=>{console.log(e)}}>
            </TextEditor>
        }
        else if(comp==="image"){
            
            return <ImgEditor index="landingPageImage:1" img={{'tag':'img', contents:{'src':'/images/imgBg.png'}}}  modifyImage={(d1,d2)=>{return;}} landingPage="true">
            </ImgEditor>
        }
    }

    miniMenuSecondary=()=>{
        return (
            <div className="container-lg">
                <nav className="transparent navbar navbar-dark navbar-expand-lg sticky-top" id="navTopBg">
                        <Link className="navbar-brand bold " to='/' >
                            <span id="logoMenuPg" style={{color:'black', fontSize:"30px",fontFamily: 'ANNIHILATOR', fontWeight:"bolder"}}>UrCV</span>
                        </Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon" style={{color:'black'}}></span>
                        </button>
                        <div className="collapse navbar-collapse  " id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto align-items-center">
                                <li className="nav-item mr-3 ml-3 activeItem" >
                                    <Link to='/' className="nav-link"><span className="headerMenuPage" style={{fontSize:"15px",color:'black'}}>Home</span></Link>
                                </li>
                                <li className="nav-item mr-3 ml-3" >
                                    <Link to='/template/view' className="nav-link"><span className="headerMenuPage" style={{fontSize:"15px",color:'black'}}>Design</span></Link>
                                </li>
                                <li className="nav-item mr-3 ml-3" >
                                    <Link to='/template/view' className="nav-link"><span className="headerMenuPage" style={{fontSize:"15px",color:'black'}}>About</span></Link>
                                </li>

                            </ul>
                            <ul className="navbar-nav ml-auto align-items-center">
                                {this.userMenu()}
                            </ul>
                        </div>
                </nav>
            </div>
        )
    }

    render() { 
        let {templateViews}=this.state
        let blueImage="/icons/templateBlue.png"
        let normal="/icons/template.png"
        let innerhtml, deployDisplayHtml
        try{
        innerhtml=this.state.templateViews[this.state.templateChoice].html
        deployDisplayHtml=this.state.templateViews[0].html

        }
        catch(e){
            innerhtml="<p></p>"
        }
        let editorComponent=this.state.editorComponent
        let changedClass="editorLookBoxInnerBlue"
        let editorViewTemp={backgroundColor:"white"}
      
        return (    
            <React.Fragment>
                <div id="menuTopBackground"className="mb-5" >
                    <div className="container-lg">
                        <nav className="transparent navbar navbar-dark navbar-expand-lg" id="navTopBg" >
                            
                            <Link className="navbar-brand bold " to='/' >
                                <span id="logoMenuPg" style={{color:'white', fontSize:"30px",fontFamily: 'ANNIHILATOR', fontWeight:"bolder"}}>UrCV</span>
                            </Link>

                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon" style={{color:'white'}}></span>
                            </button>

                            <div className="collapse navbar-collapse  " id="navbarSupportedContent">
                                <ul className="navbar-nav mr-auto align-items-center">
                                    <li className="nav-item mr-3 ml-3 activeItem" >
                                        <Link to='/' className="nav-link"><span className="headerMenuPage" style={{fontSize:"15px"}}>Home</span></Link>
                                    </li>
                                    <li className="nav-item mr-3 ml-3" >
                                        <Link to='/template/view' className="nav-link"><span className="headerMenuPage" style={{fontSize:"15px"}}>Design</span></Link>
                                    </li>
                                    <li className="nav-item mr-3 ml-3" >
                                        <Link to='/template/view' className="nav-link"><span className="headerMenuPage" style={{fontSize:"15px"}}>About</span></Link>
                                    </li>

                                </ul>


                                <ul className="navbar-nav ml-auto align-items-center">
                                    {this.userMenu()}
                                </ul>
                            </div>

                        </nav>

                        <h1 className="centerTextLanding mt-5 col-12 " >
                                <span className>UrCV makes it easier to <span style={{color: "#ecb22e"}} >build and deploy</span> your portfolio at no cost.</span>
                        </h1>
                    
                        <div className="container " style={{textAlign:"center"}}>
                            <Button style={{backgroundColor:"white", color:"#611f69",textTransform: 'none',boxShadow: 'inset 0 0 0 1px #611f69'}}>
                                <Link className="p-3 buttonTextMenu" to='/template/view'>Try our templates</Link>
                            </Button>
                        </div>

                        <div className="container-lg mt-5 mb-5 templateViewScroll dynamicInnerContent" style={{ position: "-webkit-sticky",position: "sticky"}}>
                            <div className="templateViewScrollBottom " >
                                <video autoPlay={true} muted={true} src="/videos/screen-capture.mp4" className="screenCaptureVid"></video>
                            </div>
                        </div>

                    </div>
                </div>
                <div style={{height:"2000px"}} className="middleMenuPg mt-5">
                    <div className=" mt-5 dynamicInnerContent">
                        <div className="parentCenterTarget " style={{height:"100vh"}}>
                            <div className="d-flex flex-lg-row flex-column  justify-content-center">
                                <div className="mt-5 col-lg-4 col-12 templateViewDivCenter d-flex flex-column  mb-5" >
                                    <h1 className="mainPageHeaderBig row centerAlignOnReduce">Choose any template to start with.</h1>
                                    <h3 className="mt-lg-3 mt-2 row float-left normalLandingText" >See what the templates look like:</h3>
                                    <div className="mt-lg-1 row">
                                        <div className="d-flex flex-row flex-wrap  pcTargetTemplateViewOuter">
                                            {templateViews.map((template,id)=>{
                                                let imgSrc=id==this.state.templateChoice?blueImage:normal;
                                                let classImg=id==this.state.templateChoice?"pcTargetTemplateViewInnerBlue":"pcTargetTemplateViewInner"
                                                return  <div key={id} className={`col-3 ${classImg} pcTargetTemplateViewInnerResponsive`} onClick={(e)=>{this.chooseView(id)}} style={{border:"1px solid #611f69"}}>
                                                            <div className="d-flex flex-column pcTargetTemplateViewInnerPadded"  style={{textAlign:"center"}}>
                                                                <div className="col">
                                                                    <img className="pcTargetTemplateViewInnerImg" src={imgSrc}>
                                                                    </img>
                                                                </div>
                                                                <div className="col mt-2 mr-4"  className="pcTargetTemplateViewInnerNames"  style={{}}>
                                                                    {template.name}
                                                                </div>
                                                            </div>                                                            
                                                        </div>
                                            })}
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-lg -5 col-lg-8 col-12 mt-5 mb-5" >
                                    <div className="templateViewScrollTop" >
                                        <div className="templateViewScrollTopButtons">
                                            <div className="templateViewScrollTopButton" style={{backgroundColor:"#ff6059"}}>
                                            </div>
                                            <div className="templateViewScrollTopButton" style={{backgroundColor:"#ffbe2f"}}>
                                            </div>
                                            <div className="templateViewScrollTopButton" style={{backgroundColor:"#2aca41"}}>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="templateViewScrollBottom codeDisplayTemplate" style={{border:"1px solid white"}}>
                                        <div className="templateActualView" >
                                                <div dangerouslySetInnerHTML={{__html:innerhtml}} id="codeDisplayInnerHtml">
                                                </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="blueBgCenterTarget" style={{padding:"20px",height:"100vh"}}>
                            <div className="mt-5 parentCenterTarget ">
                                <div className="d-flex flex-lg-row flex-column  justify-content-center">
                                <div className="mt-5 col-lg-5 col-12 templateViewDivCenter d-flex flex-column  mb-5" >
                                    <h1 className="mainPageHeaderBig row mainPageResponsiveHeader" style={{color:"white"}}>Publish your site to github in one click.</h1>
                                    <h3 className="row float-left normalLandingText" style={{color:"white"}}>HTML, CSS and JS file of your site will be pushed to your github pages.</h3>
                                    <h5 className="row float-left normalLandingText mt-3" style={{fontWeight:"bold", color:"white"}}>Try deploying this sample site to your git.</h5>
                                    <div className="col-12 mt-5">
                                        <ButtonGroup variant="contained" color="primary" className="d-flex flex-column">
                                            <Button  color="secondary" className="mb-4" startIcon={<PublishIcon />}
                                                     onClick={async()=>{ 
                                                        window.open(`${serverEndPoint}/publish/code?siteID=60b774d3a4333149bcdff619`,'_blank');
                                                      }}
                                            >Publish to Github</Button>
                                            <Button  color="secondary" startIcon={<SaveIcon />}>Download as PDF</Button>
                                        </ButtonGroup>
                                    </div>

                                </div>
                                <div className="mt-lg -5 col-lg-7 col-12 mt-lg-5 mb-5 " style={{height:"100%"}}>
                                    <div className="templateViewScrollTop mb-n2" >
                                        <div className="templateViewScrollTopButtons">
                                            <div className="templateViewScrollTopButton" style={{backgroundColor:"#ff6059"}}>
                                            </div>
                                            <div className="templateViewScrollTopButton" style={{backgroundColor:"#ffbe2f"}}>
                                            </div>
                                            <div className="templateViewScrollTopButton" style={{backgroundColor:"#2aca41"}}>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="templateViewScrollBottom codeDisplayTemplate" style={{border:"1px solid white", backgroundColor:"white"}}>
                                        <div className="templateActualView" >
                                                <div dangerouslySetInnerHTML={{__html:deployDisplayHtml}} id="codeDisplayInnerHtml">
                                                </div>
                                        </div>
                                    </div>
                                </div>

                                </div>
                            </div>
                        </div>

                        <div className="parentCenterTarget" style={{height:"100vh"}}>
                            <div className="d-flex flex-lg-row flex-column  justify-content-center">
                                <div className="mt-5 col-lg-6 col-12 templateViewDivCenter d-flex flex-column  mb-5" >
                                    <h1 className="mainPageHeaderBig row centerAlignOnReduce">Explore our rich editing features.</h1>
                                    <h3 className="row float-left normalLandingText" >Multiple individual editors combined to give rich editing experience.</h3>
                                    <h5 className="row float-left normalLandingText mt-3" style={{fontWeight:"bold"}}>See what each editor looks like:</h5>
                                    <div className="mt-3 row d-flex flex-column align-items-center justify-content-center editorLookBoxOuter" >
                                        {this.state.editorComponent==="text"?
                                            <div className={`col p-2 editorLookBoxInner ${changedClass}`} style={{  borderBottom: "2px solid #611f69"}} onClick={(e)=>{this.setEditorType("text")}}>
                                                <div className="d-flex flex-row justify-content-between">
                                                Text Editor
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="-288 379 35 35" width="20" height="20"  className="v--homepage__customer-story-option__arrow svg-replaced " shapeRendering="geometricPrecision"><path d="M-256.5 395.5l-9.9-10.1c-.6-.6-1.5-.6-2 0-.6.6-.6 1.5 0 2.1l7.5 7.6h-22.4c-.8 0-1.4.7-1.4 1.5s.6 1.5 1.4 1.5h22.4l-7.5 7.6c-.6.6-.6 1.5 0 2.1.6.6 1.5.6 2 0l9.9-10.1c.5-.7.5-1.7 0-2.2z" style={{fill: "#fff"}}></path></svg>
                                                </div>
                                            </div>
                                            
                                            :
                                            <div className="col p-2 editorLookBoxInner" style={{  borderBottom: "2px solid #611f69"}}  onClick={(e)=>{this.setEditorType("text")}}>
                                                <div className="d-flex flex-row justify-content-between">
                                                    Text Editor
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-288 379 35 35" width="20" height="20"  className="v--homepage__customer-story-option__arrow svg-replaced " shapeRendering="geometricPrecision"><path d="M-256.5 395.5l-9.9-10.1c-.6-.6-1.5-.6-2 0-.6.6-.6 1.5 0 2.1l7.5 7.6h-22.4c-.8 0-1.4.7-1.4 1.5s.6 1.5 1.4 1.5h22.4l-7.5 7.6c-.6.6-.6 1.5 0 2.1.6.6 1.5.6 2 0l9.9-10.1c.5-.7.5-1.7 0-2.2z" style={{fill: "#611f69"}}></path></svg>
                                                </div>
                                            </div>
                                        }
                                        {this.state.editorComponent==="image"?
                                            <div className={`col p-2 editorLookBoxInner ${changedClass}`} style={{  borderBottom: "2px solid #611f69"}}  onClick={(e)=>{this.setEditorType("image")}}>
                                                     <div className="d-flex flex-row justify-content-between">
                                                        Image Editor
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="-288 379 35 35" width="20" height="20"  className="v--homepage__customer-story-option__arrow svg-replaced " shapeRendering="geometricPrecision"><path d="M-256.5 395.5l-9.9-10.1c-.6-.6-1.5-.6-2 0-.6.6-.6 1.5 0 2.1l7.5 7.6h-22.4c-.8 0-1.4.7-1.4 1.5s.6 1.5 1.4 1.5h22.4l-7.5 7.6c-.6.6-.6 1.5 0 2.1.6.6 1.5.6 2 0l9.9-10.1c.5-.7.5-1.7 0-2.2z" style={{fill: "#fff"}}></path></svg>
                                                    </div>
                                            </div>
                                            :
                                            <div className="col p-2 editorLookBoxInner" style={{  borderBottom: "2px solid #611f69"}} onClick={(e)=>{this.setEditorType("image")}}>
                                                    <div className="d-flex flex-row justify-content-between">
                                                        Image Editor
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="-288 379 35 35" width="20" height="20"  className="v--homepage__customer-story-option__arrow svg-replaced " shapeRendering="geometricPrecision"><path d="M-256.5 395.5l-9.9-10.1c-.6-.6-1.5-.6-2 0-.6.6-.6 1.5 0 2.1l7.5 7.6h-22.4c-.8 0-1.4.7-1.4 1.5s.6 1.5 1.4 1.5h22.4l-7.5 7.6c-.6.6-.6 1.5 0 2.1.6.6 1.5.6 2 0l9.9-10.1c.5-.7.5-1.7 0-2.2z" style={{fill: "#611f69"}}></path></svg>
                                                    </div>
                                            </div>
                                        }
                                        {this.state.editorComponent==="project"?
                                            <div className={`col p-2 editorLookBoxInner ${changedClass}`} onClick={(e)=>{this.setEditorType("project")}}>
                                                     <div className="d-flex flex-row justify-content-between">
                                                        Project Editor
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="-288 379 35 35" width="20" height="20"  className="v--homepage__customer-story-option__arrow svg-replaced " shapeRendering="geometricPrecision"><path d="M-256.5 395.5l-9.9-10.1c-.6-.6-1.5-.6-2 0-.6.6-.6 1.5 0 2.1l7.5 7.6h-22.4c-.8 0-1.4.7-1.4 1.5s.6 1.5 1.4 1.5h22.4l-7.5 7.6c-.6.6-.6 1.5 0 2.1.6.6 1.5.6 2 0l9.9-10.1c.5-.7.5-1.7 0-2.2z" style={{fill: "#fff"}}></path></svg>
                                                    </div>
                                            </div>
                                            :
                                            <div className="col p-2 editorLookBoxInner" >
                                                     <div className="d-flex flex-row justify-content-between" onClick={(e)=>{this.setEditorType("project")}}>
                                                        Project Editor
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="-288 379 35 35" width="20" height="20"  className="v--homepage__customer-story-option__arrow svg-replaced " shapeRendering="geometricPrecision"><path d="M-256.5 395.5l-9.9-10.1c-.6-.6-1.5-.6-2 0-.6.6-.6 1.5 0 2.1l7.5 7.6h-22.4c-.8 0-1.4.7-1.4 1.5s.6 1.5 1.4 1.5h22.4l-7.5 7.6c-.6.6-.6 1.5 0 2.1.6.6 1.5.6 2 0l9.9-10.1c.5-.7.5-1.7 0-2.2z" style={{fill: "#611f69"}}></path></svg>
                                                    </div>
                                            </div>
                                        }

                                    </div>
                                </div>
                                <div className="mt-lg -5 col-lg-6 col-12 mt-5 mb-5 " >
                                    <div className="templateViewScrollTop mb-n2" >
                                        <div className="templateViewScrollTopButtons">
                                            <div className="templateViewScrollTopButton" style={{backgroundColor:"#ff6059"}}>
                                            </div>
                                            <div className="templateViewScrollTopButton" style={{backgroundColor:"#ffbe2f"}}>
                                            </div>
                                            <div className="templateViewScrollTopButton" style={{backgroundColor:"#2aca41"}}>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={editorViewTemp} className="">
                                        {this.editorComponentLanding(this.state.editorComponent)}
                                    </div>
                                    
                                </div>
                            </div>
                        </div>

                        {/* To be edited */}
                        <div className="blueBgCenterTarget" style={{padding:"20px",height:"100vh"}}>
                            <div className="mt-5 parentCenterTarget ">
                                <div className="d-flex flex-lg-row flex-column  justify-content-center">
                                <div className="mt-5 col-lg-5 col-12 templateViewDivCenter d-flex flex-column  mb-5" >
                                    <h1 className="mainPageHeaderBig row mainPageResponsiveHeader" style={{color:"white"}}>Publish your site to github in one click.</h1>
                                    <h3 className="row float-left normalLandingText" style={{color:"white"}}>HTML, CSS and JS file of your site will be pushed to your github pages.</h3>
                                    <h5 className="row float-left normalLandingText mt-3" style={{fontWeight:"bold", color:"white"}}>Try deploying this sample site to your git.</h5>
                                    <div className="col-12 mt-5">
                                        <ButtonGroup variant="contained" color="primary" className="d-flex flex-column">
                                            <Button  color="secondary" className="mb-4" startIcon={<PublishIcon />}
                                                     onClick={async()=>{ 
                                                        window.open(`${serverEndPoint}/publish/code?siteID=60b774d3a4333149bcdff619`,'_blank');
                                                      }}
                                            >Publish to Github</Button>
                                            <Button  color="secondary" startIcon={<SaveIcon />}>Download as PDF</Button>
                                        </ButtonGroup>
                                    </div>

                                </div>
                                <div className="mt-lg -5 col-lg-7 col-12 mt-lg-5 mb-5 " style={{height:"100%"}}>
                                    <div className="templateViewScrollTop mb-n2" >
                                        <div className="templateViewScrollTopButtons">
                                            <div className="templateViewScrollTopButton" style={{backgroundColor:"#ff6059"}}>
                                            </div>
                                            <div className="templateViewScrollTopButton" style={{backgroundColor:"#ffbe2f"}}>
                                            </div>
                                            <div className="templateViewScrollTopButton" style={{backgroundColor:"#2aca41"}}>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="templateViewScrollBottom codeDisplayTemplate" style={{border:"1px solid white", backgroundColor:"white"}}>
                                        <div className="templateActualView" >
                                                <div dangerouslySetInnerHTML={{__html:deployDisplayHtml}} id="codeDisplayInnerHtml">
                                                </div>
                                        </div>
                                    </div>
                                </div>

                                </div>
                            </div>
                        </div>


                    </div>
                </div>
                <div>

                </div>
            </React.Fragment>
        );
    }
}
 
export default Menu;

