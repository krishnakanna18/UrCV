import React, { Component } from 'react';
import '../../public/css/TextEditor.css'
import TextareaAutosize from 'react-textarea-autosize';
import autosize from 'autosize'
import { initial } from 'lodash';

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


    
    //Function to respond to changes in the Text
    onChange=(e)=>{

        if(e.which===13 && e.type==="keydown")
        {
            e.preventDefault();
            // let br=document.createElement('br')
            // br.style.marginBottom="0em"
            // br.style.display="block"
            // e.target.children[0].appendChild(br)
            e.target.children[0].appendChild(document.createElement('br'))
            return

        }
        if(e.keyCode===8 && e.type==="keydown")
        {   
            e.preventDefault();

        }
        if(e.which===13 && e.type==="keyup")
        {   
            e.preventDefault();
            let emptySpan=document.createElement('span')
            emptySpan.innerHTML='&nbsp;'
            emptySpan.style.fontSize="100%"
            emptySpan.classList.add("editorText")
            e.target.children[0].appendChild(emptySpan)
            return
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
        spanTexts=e.currentTarget.children[0].children;
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
                                onKeyUp={(e)=>{ 
                                        this.onChange(e)}} 
                                contentEditable={true}
                                suppressContentEditableWarning={true}
                                >
                                <p  className="editorText" 
                                    contentEditable="inherit"
                                >
                                    {   displayStrings.length>0?
                                            displayStrings.map((st,id)=>{
                                                return <span style={st.style} key={`${id}`} className="editorText" 
                                               
                                                >
                                                    {`${st.text}`}
                                                </span>
                                            })
                                            :<span style={{fontSize:"100%"}}>

                                            </span>
                                    }
                                </p>

                    </div> 
                </div>
            </React.Fragment>

         );
    }
}
 
export default TextEditor;

{/* <script>
const tx = document.getElementsByTagName('textarea');
for (let i = 0; i < tx.length; i++) {
  tx[i].setAttribute('style', 'height:' + (tx[i].scrollHeight) + 'px;overflow-y:hidden;');
  tx[i].addEventListener("input", OnInput, false);
}

function OnInput() {
  this.style.height = 'auto';
  this.style.height = (this.scrollHeight) + 'px';
}
</script> */}