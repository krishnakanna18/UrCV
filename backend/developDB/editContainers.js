// 5f427a854c7552097b63dc6b"
const Container=require("../Schemas/containerSchema");

        Container.findById("5f427a854c7552097b63dc6b",(err,res)=>{
            if(err)
                throw err;
            console.log(res);
        })

        let inner=new Container({
            tag:'span',
            contents:{
                text:"!"
            }
        })

        inner.save().then(res=>{
            console.log(res);
        })

        Container.findByIdAndUpdate("5f427a854c7552097b63dc6b",{$push:{children:inner}},{returnOriginal: false,new:true}        ,(err,res)=>{
            if(err)
                throw err;
            console.log(res);
        })
        