import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
// @ts-ignore
import "bootstrap/dist/js/bootstrap.min.js";
import 'jquery/dist/jquery.min.js';
import '../css/ImgEditor.css'
class ImgEditor extends Component {
    constructor(props){
        super(props);
    }



    getBase64Image=(imgUrl, callback)=> {

        var img = new Image();
    
        // onload fires when the image is fully loadded, and has width and height
    
        img.onload = function(){
    
          var canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          var ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);
          var dataURL=canvas.toDataURL()
        //   var dataURL = canvas.toDataURL("image/"),
            //   dataURL = dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
    
          callback(dataURL); // the base64 string
    
        };
    
        // set attributes and src 
        img.setAttribute('crossOrigin', 'anonymous'); //
        img.src = imgUrl;
    }

    //Upload the image and send to parent
    uploadImage=(e)=>{

        let reader=new FileReader();                 //Read the uploaded image
        reader.readAsDataURL(e.target.files[0])      //Convert the uploaded image into URI
        let imgNode=e.target.parentNode.nextSibling.children[0];
        let img=JSON.parse(JSON.stringify(this.props.img))
        let index=this.props.index
        reader.onload=()=>{
            img.contents.src=reader.result;
            this.props.modifyImage(index,img);    //Send the image to parent and update
            imgNode.setAttribute("src",reader.result)
        }


    }


    openImageEditor=()=>{
        let constructor_options ={apikey: '3agdg7w3puw0',onSave: (image)=>{
            let img=JSON.parse(JSON.stringify(this.props.img))
            let data='data:image/png;base64,'+image.toBase64()
            img.contents.src=data;
            document.getElementById(`${this.props.index}:imageEditor`).setAttribute('src',data)
            let index=this.props.index
            this.props.modifyImage(index,img); 

        }};
        let editor = new Pixo.Bridge(constructor_options);
        let image=document.getElementById(`${this.props.index}:imageEditor`)
        if(image.getAttribute('src').match('http://localhost:9000/'))  
        {   
            (async()=>{
                let data=await fetch(image.getAttribute('src'),{
                    method:"get",
                    credentials:"include"

                })
                data=await data.blob()
                let reader=new FileReader()
                reader.onload=()=>{
                    editor.edit(reader.result)

                }
                reader.readAsDataURL(data) ;
               
                // editor.edit(encodedData)
                // console.log(data)
            })()
        }
        else 
            editor.edit(image)

        // catch(e){
        //     console.log(e,"Edit error")
        //     this.getBase64Image(document.getElementById(`${this.props.index}:imageEditor`).getAttribute("src"),(img)=>{
        //         console.log(img)
        //         editor.image(img)
        //     })
        // }
    }

    render() { 
        let {img,index}=this.props

        // console.log(img)
        return  <div  className="mt-2 mb-2 imgEditorOverlay" style={{}}
        >           
                    <div className="imgOptOly d-flex flex-row " style={{display:"none"}}>
                        <label htmlFor="img-upload" className="imgEdtOpt col">Replace</label>
                        <input type="file" accept="image/*" id="img-upload" onChange={(e)=>this.uploadImage(e)}
                        />
                        <div style={{ width: "2px",background:  "white"}}>
                        </div>
                        <label className="imgEdtOpt col" onClick={this.openImageEditor}>
                            Edit
                        </label>
                    </div>

                   
                    
                    <div className="mt-1 mb-1 imgEditor d-flex justify-content-center align-items-center">
                        <img className="img-fluid imgEdt" src={`${img.contents.src}`} id={`${index}:imageEditor`} 
                        >
                        </img>
                    </div>
 
                </div>
    }
}
 
export default ImgEditor;
// 