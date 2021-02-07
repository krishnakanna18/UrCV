import React, { Component } from 'react';
import '../../public/css/TextEditor.css'
import fonts from '../../public/jsonFiles/bestFonts.json'
import { CompactPicker } from 'react-color';
import { SwatchesPicker } from 'react-color';


// import TextareaAutosize from 'react-textarea-autosize';
// import autosize from 'autosize'
// import { initial, range } from 'lodash';

class TextEditor extends Component {

    constructor(props){
        super(props);
        this.state={
            defaultStyles:{fontWeight:"normal", fontStyle:"none", textDecoration:"none", fontFamily:"Alice",color:"#333333"},
            editStyles:{fontWeight:"bold", fontStyle:"italic", textDecoration:"underline"},
            test:0
        }
    }


    // Group the nested sentences along with the styles
    groupTextStyles=(Text,sentence)=>{
        if(Text.styles){
            if("fontSize" in Text.styles)
                Text.styles["fontSize"]="100%"
            else
                Text.styles={...Text.styles, fontSize:"100%"}
            sentence.push({text:Text.contents.text, style:Text.styles})
        }
        else
            sentence.push({text:Text.contents.text, style:{fontSize:"100%"}})

        if(Text.children.length===0)
            return

        if(Text.children)
            for(let i=0; i<Text.children.length; i++)
                return this.groupTextStyles(Text.children[i],sentence)
            
        
    }

    //Set the values of the style editor attributes of the corresponding textbox
    setStyleEditor=()=>{

        let Style={...this.state.defaultStyles},
        Selection=document.getSelection(),
        {anchorNode,focusNode, anchorOffset, focusOffset}=Selection,
        ancParent=anchorNode.parentNode, focParent=focusNode.parentNode,
        parentEditor=ancParent.parentNode.parentNode.previousSibling,
        isSingleChar=(ancParent===focParent && anchorOffset===focusOffset), styleAttributes

        styleAttributes=parentEditor.querySelectorAll(".styleAtb")
        let arr=Object.entries(Style), i=0

        if(ancParent.tagName==="SPAN" && isSingleChar)
        {
           
            for(i=0; i<3; i++){
                if(arr[i][1]!==ancParent.style[arr[i][0]] && ancParent.style[arr[i][0]].length>0)
                        styleAttributes[i].style['backgroundColor']="#87ccaa"
                else
                    styleAttributes[i].style['backgroundColor']="#FFFFFF"
            }
   
        }

        if(ancParent.tagName==="SPAN" && focParent.tagName==="SPAN")
            for(i=3; i<arr.length ;i++){
                if(arr[i][0]!=="color"){
                    let val=ancParent.style[arr[i][0]]

                    if(val[0]==='"')
                            val=val.slice(1,val.length-1)

                    if(val.length>6){
                        val=val.slice(0,6)
                        val+=".."
                    }
                    if(ancParent===focParent)
                        styleAttributes[i].innerText=val
                    else
                        styleAttributes[i].innerText="      "

                    styleAttributes[i].setAttribute("title",ancParent.style[arr[i][0]])
            }

            }
      
    }



    updateParent=(e)=>{

        let propText=this.props.text,
            targetChild=e.target.children[0]

        let propClass=propText.classlist, propStyle=propText.styles;
        let textComponent={
            tag:"p",
            classlist:propClass,
            styles:{...propStyle},
            contents:{text:""},
            children:[]
        }

        let spanTexts
        try{
        spanTexts=targetChild.children;
        }
        catch(e){
            textComponent.children.push(
                {
                    tag:"span",
                    classlist:[],
                    styles:{},
                    contents:{text:``},
                    children:[]   
                }
                )
            return 
            
        }
        for(let span of spanTexts)
        {      
            if(span.tagName==="BR")
                {
                    textComponent.children.push(
                        {
                            tag:"br",classlist:[],styles:{},contents:{},children:[]   
                        }
                        ) 
                    continue
                }
            let spanStyle=[], spanObj={}
            try{
                spanStyle=span.style.cssText.slice(0,-1).split("; ")
                }
                catch(e)
                {}
            if(span.style.cssText.length>0)
                for(let style of spanStyle)
                {   let key = style.split(":")[0],val=style.split(":")[1]
                    while(val[0]===" ")
                        val=val.slice(1)
                    if(key.length===0 || val.length===0)  
                        continue
                    spanObj={
                        [key]:val,
                        ...spanObj
                    }
                }            
            textComponent.children.push({
                    tag:"span",
                    classlist:[],
                    styles:spanObj,
                    contents:{text:`${span.innerText}`},
                    children:[]   
                }
            )  
        }

        console.log(textComponent)
    }


    setFocus=(Selection, element, offset=0)=>{

        let range=document.createRange()
            range.setStart(element,offset)
            range.setEnd(element,offset)
            Selection.removeAllRanges();
            Selection.addRange(range)

    }


    
    //Function to respond to changes in the Text
    //Under construction
    onChange=(e)=>{
        
        let targetChild=e.target.children[0],   //Parent Paragraph of the editable text
            Selection=document.getSelection(),   //Selection object
            {anchorNode,focusNode, anchorOffset, focusOffset}=Selection,
            ancParent=anchorNode.parentNode, focParent=focusNode.parentNode,
            Styles=this.state.defaultStyles      //Default Style Object

        if(e.which===13 && e.type==="keydown")   //Handle enter keydown event
        {   
            e.preventDefault();
            return
        }

        //Handle keyup event on enter -- add empty span and focus on the empty span
        if(e.which===13 && e.type==="keyup")
        {   
            e.preventDefault();  //Prevent default action on enter

            //Create an empty span and attach it to the target child
            let emptySpan=document.createElement('span')
            
            for(let [key,value] of Object.entries(Styles))  //Initialise style properties with the state stored values
                emptySpan.style[key]=value

            emptySpan.style.fontSize="100%"
            emptySpan.classList.add("editorText")

            if(ancParent===focParent && ancParent.tagName==="SPAN")  //Same span element
            {

                    if(focusOffset<anchorOffset)
                        [focusOffset, anchorOffset]=[anchorOffset, focusOffset]

                    let parentIndex=[...targetChild.children].indexOf(ancParent),
                        textLength=anchorNode.textContent.length,                 //Length of the span element
                        spanText, anchorText,                                     //Text inside replacing span and replaced span
                        isFullText=(focusOffset-anchorOffset===textLength && focusOffset!==anchorOffset) //If entrie span is selected

                    spanText=anchorNode.textContent.slice(focusOffset,textLength)  
                    anchorText=anchorNode.textContent.slice(0,anchorOffset)

                    if(focusOffset===textLength && !isFullText)                                 //If caret after end of span
                        if(ancParent.nextSibling===null || ancParent.nextSibling.tagName==="BR")
                                spanText="&#65279;"

                    else if(anchorOffset===0 || isFullText===true)                                  //If caret before beginning of span
                        anchorText="&#65279;" 

                    emptySpan.innerHTML=spanText                                  //Split the span element
                    if(focusOffset<textLength)
                        emptySpan.style.cssText=ancParent.style.cssText               //Set the style 

                    ancParent.innerHTML=anchorText

                    if(ancParent.nextSibling===null || ancParent.nextSibling.tagName!=="BR" || !isFullText)   //TO avoid consecutive br elements
                        targetChild.insertBefore(document.createElement("br"),targetChild.children[parentIndex+1])  //Add br after the replaced span
                    

                    if(spanText.length>0 && !isFullText)                                         //If replacing span non empty
                       { targetChild.insertBefore(emptySpan,targetChild.children[parentIndex+2])
                          this.setFocus(Selection,emptySpan)
                       }
                    else
                        this.setFocus(Selection,ancParent.nextSibling.nextSibling)  //Set focus on element after br(node+2)                    
            }

            else if(ancParent.tagName==="SPAN" && focParent.tagName==="SPAN"){   //If more than one span elements are selected

                let ancIndex=[...targetChild.children].indexOf(ancParent),
                    focIndex=[...targetChild.children].indexOf(focParent)

                if(focIndex<ancIndex)         //Swap all the properties of focus and anchor node
                    [ancParent,focParent,anchorOffset,focusOffset,ancIndex,focIndex,anchorNode,focusNode]
                   =[focParent,ancParent,focusOffset,anchorOffset,focIndex,ancIndex,focusNode, anchorNode]
                
                let focusText=focusNode.textContent.slice(focusOffset,focusNode.textContent.length),  
                    anchorText=anchorNode.textContent.slice(0,anchorOffset),
                    end=focIndex

                if(anchorOffset===0 && focusOffset===focusNode.textContent.length)  //If selection contains entire anchor and focus Text
                    {focusText=anchorText="&#65279;"; end+=2}

                else if(anchorOffset===0)   //If selection contains entire anchor Text
                    anchorText="&#65279;"

                else if(focusOffset===focusNode.textContent.length)  //If selection contains entire focus Text
                    focusText="&#65279;"

                ancParent.innerHTML=anchorText
                focParent.innerHTML=focusText

                targetChild.insertBefore(document.createElement("br"),targetChild.children[ancIndex+1])  //Add br after the replaced span

                for(let i=ancIndex+1; i<end; i++)   //Remove all nodes inbetween the anchor and focus node
                    targetChild.children[ancIndex+1].remove()    
            }
        }

        this.setStyleEditor()
        return



        //Under construction
        if(e.keyCode===8 && e.type==="keydown") //Handle backspace keydown event
        {   
            let Selection=window.getSelection()


            if(Selection.isCollapsed===true){

                let selectionParent=Selection.anchorNode.parentNode


                    if((selectionParent.innerHTML==="&nbsp;" || selectionParent.innerHTML===" ") && targetChild.children.length>1){
                        console.log("Yes")
                        e.preventDefault();
                        selectionParent.remove()
                    }


                    else if(((targetChild.children.length===1 || selectionParent.previousSibling===null) && selectionParent.innerText.length===1) || 
                        ( selectionParent.innerHTML.length===1 && targetChild.children.length>1))
                        {   
                            console.log(selectionParent.innerText.length,selectionParent.innerText, selectionParent)
                            e.preventDefault();
                            selectionParent.innerHTML="&nbsp;"
                                        //Set the focus on the new line
                            let range=document.createRange()
                            range.setStart(selectionParent,0)
                            range.setEnd(selectionParent,0)
                            Selection.removeAllRanges();
                            Selection.addRange(range)

                        }
    
            }
            else{
                let anchor=Selection.anchorNode, focus=Selection.focusNode
                e.preventDefault()
                if(anchor.parentNode===focus.parentNode)
                {
                    console.log("Equal")
                    console.log(Selection.anchorOffset,Selection.focusOffset, Selection.textContent)

                }
                console.log(anchor,focus)
            }

        }


        if(e.type==="keydown")
            return;

    }


    // End of the change function

    styleEvent=(e,attribute,value=undefined)=>{


        let {editStyles, defaultStyles}=this.state,
            Selection=document.getSelection(),
            {anchorNode,focusNode, anchorOffset, focusOffset}=Selection,
            ancParent=anchorNode.parentNode, focParent=focusNode.parentNode,
            tarAtt=e.target.parentNode,
            isSingleChar=(ancParent===focParent && anchorOffset===focusOffset),
            parentEditor=ancParent.parentNode.parentNode

        

        let fontProps=false
        if(attribute==="fontWeight"||attribute==="fontStyle"||attribute==="textDecoration")
            fontProps=true

        if(e.target.parentNode.tagName==="IMG")
            tarAtt=e.target.parentNode.parentNode

        if(e.target.getAttribute("class").includes("font"))
            tarAtt=e.target.parentNode.parentNode

        if(e.target.getAttribute("class").includes("color"))
            tarAtt=e.target.parentNode.parentNode.parentNode

        if(attribute==="color")
            tarAtt=e.target.closest(".colorParent").parentNode

        let isSameEditor=(parentEditor.previousSibling===tarAtt.parentNode)
        console.log(isSameEditor)

        if(isSameEditor){

            let ancIndex=[...parentEditor.children[0].children].indexOf(ancParent),
                focIndex=[...parentEditor.children[0].children].indexOf(focParent)

            if(focIndex<ancIndex)         //Swap all the properties of focus and anchor node
                [ancParent,focParent,anchorOffset,focusOffset,ancIndex,focIndex,anchorNode,focusNode]
               =[focParent,ancParent,focusOffset,anchorOffset,focIndex,ancIndex,focusNode, anchorNode]
               
            let textLength=anchorNode.textContent.length,
                spanText=anchorNode.textContent.slice(focusOffset,textLength),  
                anchorText=anchorNode.textContent.slice(0,anchorOffset)
        
            if(ancParent.tagName==="SPAN" && focParent.tagName==="SPAN")
            {
            if(isSingleChar)    //Splitting the selected anchor parent into two and adding an empty span in between
                {                           
                    ancParent.innerText=anchorText
                    let emptySpan=document.createElement("span")
                    emptySpan.innerHTML="&#65279;"
                    let temp=ancParent.parentNode.insertBefore(emptySpan,ancParent.nextSibling)
                    temp.style.cssText=ancParent.style.cssText
                    
                    if(fontProps===false)
                        temp.style[attribute]=value

                    if(ancParent.style[attribute]===editStyles[attribute])
                        temp.style[attribute]=defaultStyles[attribute]
                    else if(fontProps===true)
                        temp.style[attribute]=editStyles[attribute]

                    if(anchorOffset!==textLength)
                    {   let nextSpan=document.createElement("span")
                        nextSpan.innerText=spanText
                        nextSpan.style.cssText=ancParent.style.cssText
                        ancParent.parentNode.insertBefore(nextSpan,temp.nextSibling)
                    }
                    // if(ancParent.innerText.length===0)
                    //     ancParent.remove()
                        
                    this.setFocus(document.getSelection(),temp,1)                     
                }

                else if(ancParent===focParent)
                {   
                    let originalText=anchorNode.textContent
                    let nextSpan=document.createElement("span")
 
                    nextSpan.style.cssText=ancParent.style.cssText
                    nextSpan.innerText=ancParent.innerText.slice(anchorOffset,focusOffset)
                    ancParent.parentNode.insertBefore(nextSpan,ancParent.nextSibling)
                    ancParent.innerText=anchorText
                    
                    if(focusOffset!==textLength)
                   { let nextSpanFocus=document.createElement("span")
                    nextSpanFocus.innerText=originalText.slice(focusOffset,textLength)
                    nextSpanFocus.style.cssText=focParent.style.cssText
                    focParent.parentNode.insertBefore(nextSpanFocus,nextSpan.nextSibling)
                    }

                    if(fontProps===false)
                        nextSpan.style[attribute]=value
                    else{                    
                    if(nextSpan.style[attribute]===editStyles[attribute] )
                        nextSpan.style[attribute]=defaultStyles[attribute]
                    else 
                        nextSpan.style[attribute]=editStyles[attribute]
                    }
                }

                else{

                    let target=editStyles[attribute]

                    if(fontProps===false)
                        target=value
                    else if(ancParent.style[attribute]===editStyles[attribute])
                        target=defaultStyles[attribute]

                    let nextSpan

                    if(anchorOffset>0){
                    nextSpan=document.createElement("span")
                    nextSpan.style.cssText=ancParent.style.cssText
                    nextSpan.innerText=ancParent.innerText.slice(anchorOffset,textLength)
                    ancParent.innerText=anchorText
                    ancParent.parentNode.insertBefore(nextSpan,ancParent.nextSibling)
                }
                    
                    if(focusOffset<focusNode.textContent.length){
                    let nextSpanFocus=document.createElement("span")
                    nextSpanFocus.innerText=focParent.innerText.slice(focusOffset,focusNode.textContent.length)
                    nextSpanFocus.style.cssText=focParent.style.cssText
                    focParent.innerText=focParent.innerText.slice(0,focusOffset)
                    focParent.parentNode.insertBefore(nextSpanFocus,focParent.nextSibling)
                    }
                    
                    if(anchorOffset>0 )
                        nextSpan.style[attribute]=target
                    else 
                        ancParent.style[attribute]=target

                    focParent.style[attribute]=target

                    console.log(anchorOffset,ancParent, nextSpan, focusOffset, focParent)

                    for(let i=ancIndex+1; i<focIndex+1; i++){
                        if(parentEditor.children[0].children[i].tagName!=="BR")
                            parentEditor.children[0].children[i].style[attribute]=target
                    }
                }
            }
        }
        this.setStyleEditor()
        this.setState({test:!this.state.test})
    }


    //Function to resize textarea size on initial mouseenter
    reSize=(e)=>{
            if(this.state.initial===0){
                e.target.setAttribute('style', 'height:' + (e.target.scrollHeight) + 'px;overflow-y:hidden;');
                this.setState({initial:1})
            }
    }


    render() { 
        let displayStrings=[]                       //Array of strings to be displayed and edited
        let Text=JSON.parse(JSON.stringify(this.props.text))
        this.groupTextStyles(Text,displayStrings)

        return ( 
            <React.Fragment>
                <div className="mt-2 mb-2 editorTextBoxOuter" style={{}}>

                     {/* Contains the editors elements/options */}
                    <div className="editorStyleBox d-flex flex-row justify-content-center">

                        <button  className="btn styleAtb" type="btn"  style={{  padding: 0,border:"none"}}  data-toggle="tooltip" data-placement="top" title="Bold"
                                 onClick={(e)=>{this.styleEvent(e,"fontWeight")}} 
                        >
                                <img alt="Alt" className="img-responsive styleImg" src="http://localhost:3000/icons/bold.png"/>
                        </button>

                        <button  className="btn styleAtb" type="btn"  style={{  padding: 0,border:"none"}}  data-toggle="tooltip" data-placement="top" title="Italic"
                                 onClick={(e)=>{this.styleEvent(e,"fontStyle")}} 
                        >
                                <img alt="Alt" className="img-responsive styleImg" src="http://localhost:3000/icons/italic.png"/>
                        </button>

                        <button  className="btn styleAtb" type="btn"  style={{  padding: 0,border:"none"}}  data-toggle="tooltip" data-placement="top" title="Underline"
                                onClick={(e)=>{this.styleEvent(e,"textDecoration")}} 
                        >
                                <img alt="Alt" className="img-responsive styleImg" src="http://localhost:3000/icons/underline.png"/>
                        </button>
                        <div className="lineBreak"></div>

                        <div className="dropdown" >
                            <button className="btn dropdown-toggle " type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" data-display="static">
                                <span style={{color:"rgb(100,124,140)"}} className="styleAtb btn-font"  data-toggle="tooltip" data-placement="top"
                                      title="Alice"
                                >Alice</span>
                            </button>
                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton" style={{width:"100%"}}>
                                {
                                    fonts.map((font,id)=>{
                                        return <a className="dropdown-item font" key={id} href="#" style={{color:"rgb(100,124,140)",backgroundColor:"white"}} 
                                                onClick={(e)=>{console.log("clicked");this.styleEvent(e,"fontFamily",font)}}
                                                >{font}</a>
                                    })
                                }
                            </div>
                        </div>
                        <div className="lineBreak"></div>

                        <div className="dropdown" >
                            <button className="btn dropdown-toggle" type="button" id="dropdownMenuButtonFont" data-toggle="dropdown" aria-haspopup="true" data-display="static"
                                onClick={(e)=>{console.log(document.getSelection())}}
                            >
                                <img alt="Alt" data-toggle="tooltip" data-placement="top" style={{width:"22px"}}
                                      title="Text color" className="img-responsive styleImg" src="http://localhost:3000/icons/textColor.png"/>
                            </button>
                            <div className="dropdown-menu dropdown-menu-right colorParent" aria-labelledby="dropdownMenuButtonFont">
                                <CompactPicker  
                                onChange={(color,e)=>{
                                                    console.log(document.getSelection(),"The selection element")
                                                    e.target.classList.add("color")
                                                    // console.log(e.target.closest(".colorParent").parentNode)
                                                    // this.styleEvent(e,"color",color.hex)
                                                }}

                                >
                                
                                </CompactPicker>
                            </div>
                        </div>
                        <div className="lineBreak"></div>







                    </div>                  

                    {/*Contains the text being edited*/} 
                    <div   className="editorTextBox"                           
                                onKeyDown={(e)=>{ 
                                    this.onChange(e)}} 
                                onKeyUp={(e)=>{ 
                                        this.onChange(e)}} 
                                onCut={(e)=>{ 
                                    this.onChange(e)}}

                                onMouseUp={(e)=>{
                                        this.setStyleEditor(e)
                                }}

                                contentEditable={true}
                                suppressContentEditableWarning={true}
                                >
                                <p  className="editorText" 
                                >
                                    {   displayStrings.length>0?
                                            displayStrings.map((st,id)=>{
                                                return <span style={st.style} key={`${id}`} className="editorText">
                                                    {`${st.text}`}
                                                </span>
                                            })
                                            :""
                                    }
                                </p>

                    </div> 
                </div>
            </React.Fragment>

         );
    }
}
 
export default TextEditor;