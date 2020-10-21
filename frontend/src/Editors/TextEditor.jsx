import React, { Component } from 'react';
import '../../public/css/TextEditor.css'
import TextareaAutosize from 'react-textarea-autosize';
import autosize from 'autosize'
import { initial } from 'lodash';
class TextEditor extends Component {

    constructor(props){
        super(props);
        this.state={
            Text:JSON.parse(JSON.stringify(this.props.text)),
            sentence:this.groupText(JSON.parse(JSON.stringify(this.props.text)),''),
            initial:0,
            startIndex:-1,
            endIndex:-1
        }
    }

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

    printSelection=(e)=>{
        let start=e.target.selectionStart,end=e.target.selectionEnd
        console.log(start,end,e.target.value.slice(start,end))
        
    }

    change=(e)=>{
        // console.log(e.type)
        console.log(e.target.selectionStart,e.target.selectionEnd,e.type,e.target.value.slice(e.target.selectionStart,e.target.selectionEnd));
        e.target.setAttribute('style', 'height:' + (e.target.scrollHeight) + 'px;overflow-y:hidden;');
        let Text=JSON.parse(JSON.stringify(this.state.Text))
        Text.contents.text=e.target.value
        this.setState({Text,sentence:e.target.value})
    }


    //Function to resize textarea size on initial mouseenter
    reSize=(e)=>{
            if(this.state.initial===0){
                e.target.setAttribute('style', 'height:' + (e.target.scrollHeight) + 'px;overflow-y:hidden;');
                this.setState({initial:1})
            }
    }

    setIndices=(e)=>{
        console.log(e.target.selectionStart,e.target.selectionEnd,e.type,e.target.value.slice(e.target.selectionStart,e.target.selectionEnd));
        this.setState({startIndex:e.target.selectionStart,endIndex:e.target.selectionEnd})
    }
    

    

    render() { 
        let {Text,sentence}=this.state
        let inner=`<i className="editorText"> ${sentence} </i>`
        return ( 
            <React.Fragment>
                <div className="mt-1 mb-1"  style={{backgroundColor:"#F5FFFF", width: "calc(10vw + 40%)", marginLeft:"calc(-1vw)"}} >
                    <div   className="editorTextBox" 
                                // onChange={(e)=>{this.change(e)}} 
                                // onMouseEnter={(e)=>{this.reSize(e)}}
                                // onMouseUp={(e)=>this.setIndices(e)}
                                // onMouseDown={(e)=>this.setIndices(e)} 
                               
                                // onKeyPress={(e)=>this.setIndices(e)}
                                style={{fontSize:"18px",resize:"none"}} 
                                >
                        {/* {`${sentence}`} */}
                        <p  contentEditable={true} className="editorText">
                           {`${inner}`}
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