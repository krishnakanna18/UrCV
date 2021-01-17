import React, { Component } from 'react';
import '../../public/css/TextEditor.css'
// import TextareaAutosize from 'react-textarea-autosize';
// import autosize from 'autosize'
// import { initial, range } from 'lodash';

//Convert the css style object to react style object
let styleParser=(styles)=>{
    let temp={}
    Object.keys(styles).map((style)=>{
         let strings=style.split('-')
         let first=strings[0]
         strings=strings.slice(1,strings.length).map((string)=>{
             return string.charAt(0).toUpperCase() + string.slice(1)
         })
         strings=[first,...strings]
         strings=strings.join('')
         temp={...temp,[strings]:styles[style]}
        
         
     })
    return temp
 }


class TextEditor extends Component {

    constructor(props){
        super(props);
        this.state={
            Text:JSON.parse(JSON.stringify(this.props.text)),
            initial:0,
            startIndex:-1,
            endIndex:-1
        }
    }

    //This comment was made to test my typing speed so dont mind this 

    //Group nested span sentences
    groupText=(Text,sentence)=>{
        if(Text.children)
            if(Text.children.length===0)
                if(sentence.length>0)
                    return `${sentence} ${Text.contents.text}`
                else
                    return `${Text.contents.text}`
        if(sentence.length>0)
            sentence=`${sentence} ${Text.contents.text}`
        else
            sentence=`${Text.contents.text}`
        if(Text.children)
            for(let i=0; i<Text.children.length; i++)
                return this.groupText(Text.children[i],sentence)
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
            ancParent=anchorNode.parentNode, focParent=focusNode.parentNode


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
                    {
                        if(ancParent.nextSibling===null || ancParent.nextSibling.tagName==="BR")
                                spanText="&nbsp;"
                    }
                    else if(anchorOffset===0 || isFullText===true)                                  //If caret before beginning of span
                        anchorText="&nbsp;" 

                    emptySpan.innerHTML=spanText                                  //Split the span element
                    emptySpan.style.cssText=ancParent.style.cssText               //Set the style   
                    ancParent.innerHTML=anchorText


                    if(ancParent.nextSibling.tagName!=="BR" || !isFullText)   //TO avoid consecutive br elements
                        targetChild.insertBefore(document.createElement("br"),targetChild.children[parentIndex+1])  //Add br after the replaced span

                    if(spanText.length>0 && !isFullText)                                         //If replacing span non empty
                       { targetChild.insertBefore(emptySpan,targetChild.children[parentIndex+2])
                          this.setFocus(Selection,emptySpan)
                       }
                    else
                        this.setFocus(Selection,ancParent.nextSibling.nextSibling)  //Set focus on element after br(node+2)
                    
            }

        }

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


        let propText=this.props.text;

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
            textComponent.children.push(
            {
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

    // End of the change function


    //Function to resize textarea size on initial mouseenter
    reSize=(e)=>{
            if(this.state.initial===0){
                e.target.setAttribute('style', 'height:' + (e.target.scrollHeight) + 'px;overflow-y:hidden;');
                this.setState({initial:1})
            }
    }

    setIndices=(st,end)=>{
        // console.log(e.target.selectionStart,e.target.selectionEnd,e.type,e.target.value.slice(e.target.selectionStart,e.target.selectionEnd));
        let {startIndex,endIndex}=this.state
        // if(startIndex===-1 && endIndex===-1)
        this.setState({startIndex:st,endIndex:end})
    }
    

    

    render() { 
        let displayStrings=[]                       //Array of strings to be displayed and edited
        this.groupTextStyles(this.props.text,displayStrings)

        return ( 
            <React.Fragment>
                <div className="mt-2 mb-2 editorTextBoxOuter">
                    <div   className="editorTextBox"                                
                                onKeyDown={(e)=>{ 
                                    this.onChange(e)}} 
                                // onMouseUp={(e)=>{
                                //     this.onChange(e)
                                // }}
                                onKeyUp={(e)=>{ 
                                        this.onChange(e)}} 
                                onCut={(e)=>{ 
                                    this.onChange(e)}}
                                contentEditable={true}
                                suppressContentEditableWarning={true}
                                >
                                <p  className="editorText" 
                                >
                                    {   displayStrings.length>0?
                                            displayStrings.map((st,id)=>{
                                                return <span style={st.style} key={`${id}`} className="editorText" 
                                               
                                                >
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