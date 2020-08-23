
//Project 1
(async()=>{
    let classes

   
    let div000=new Container({
            tag:'img',
            classlist:"",
            contents:{src:"/project.jpg"},
        })

    classes="btn col-auto"
    let div0010=new Container({
        tag:'a',
        classlist:classes.split(' '),
        contents:{
            text:"React"
        }
    })
    console.log(div0010.classlist)
    let div0011=new Container({
        tag:'a',
        classlist:classes.split(' '),
        contents:{
            text:"Bootstrap"
        }
    })
    let div0012=new Container({
        tag:'a',
        classlist:classes.split(' '),
        contents:{
            text:"JavaScript"
        }
    })
    let div0013=new Container({
        tag:'a',
        classlist:classes.split(' '),
        contents:{
            text:"NodeJS"
        }
    })
    let div0014=new Container({
        tag:'a',
        classlist:classes.split(' '),
        contents:{
            text:"MongoDB"
        }
    })

    classes="project-stack d-inline-flex flex-row flex-wrap mt-2"
    let div001=new Container({
        tag:'div',
        styles:{
            "color": "#7dcc93"
        },
        classlist:classes.split(' '),
        children:[div0010._id,div0011._id,div0012._id,div0013._id,div0014._id]
    })

    classes="font-weight-bold"
    let div0020=new Container({
        tag:'a',
        classlist:classes.split(' '),
        contents:{
            text:"UrCV Source Code",
            href:"https://github.com/krishnakanna18/test-UrCV",
            target:"_blank"
        },
        styles:{
            "color": "#fff",
            "font-size": "larger"
        }
    })

    classes="mt-n3"
    let div002=new Container({
        tag:'div',
        classlist:classes.split(' '),
        children:[div0020._id]
    })

    classes="font-weight-bold"
    let div0030=new Container({
        tag:'p',
        classlist:classes.split(' '),
        contents:{
            text:"Ongoing",
        },
    })

    classes="mt-n4"
    let div003=new Container({
        tag:'div',
        classlist:classes.split(' '),
        children:[div0030._id]
    })

    classes="col-lg-6 d-flex flex-column"
    let div00=new Container({
        tag:'div',
        classlist:classes.split(' '),
        children:[div000._id,div001._id,div002._id,div003._id]
    })
    
    classes="font-weight-bold"
    let div010=new Container({
        tag:'p',
        classlist:classes.split(' '),
        contents:{
            text:"UrCV",
        },
        styles:{
            "font-size": "xx-large"
        }
    })

    classes="mt-n3 link"
    let div011=new Container({
        tag:'p',
        classlist:classes.split(' '),
        contents:{
            text:"A developer portfolio builder",
        }
    })

    let div012=new Container({
        tag:'p',
        contents:{
            text:"This web application lets developers to create a single page portfolio website. Provides readymade editable templates. Provides a list of tools and frameworks to add to projects stack and skillset. Deploys the created site to the developer’s GitHub Pages. Current Status:  Backend APIs, Editor developed",
        },
        styles:{
            "font-size": "larger"
        }
    })

    classes="col-md-6 d-flex flex-column project-description"
    let div01=new Container({
        tag:'div',
        classlist:classes.split(' '),
        children:[div010._id,div011._id,div012._id]
    })

    classes="col-lg-6 d-flex flex-md-row flex-column project"
    let div0=new Container({
        tag:'div',
        classlist:classes.split(' '),
        children:[div00._id,div01._id],
        styles:{
            "background-color":"#7dcc93"
        }
    })
    console.log(div0.classlist)

    let ids=await insert(div00,div000,div001,div0010,div0011,div0012,div0013,div0014,div002,div0020,div003,div0030,div01,div010,div011,div012,div0)





    // classes="col-md-6 d-flex flex-column"
    // let div00=new Container({
    //         tag:'div'

    // })
    // classes="col-lg-6 d-flex flex-md-row flex-column project"
    // let div0=new Container({
    //         tag:'div',
    //         classlist:classes.split(' '),
    //         styles:{
                    // "background-color":"7dcc93"
    //         },
    //     })
    
    // let ids=await insert(div0)
    // console.log(ids)
    // Template.findByIdAndUpdate("5f215e4eca32cc5faca29122",{$push:{containers:div0._id}},{new: true, upsert: true, setDefaultsOnInsert: true},(err,res)=>{
    //     if(err)
    //         throw err;
    //     console.log(res)

    // })
    Container.findByIdAndUpdate("5f3b738679041343de0d8b28",{$push:{children:div0._id}},{new: true, upsert: true, setDefaultsOnInsert: true},(err,res)=>{
        if(err)
            throw err;
        console.log(res);
    })

    // Container.findByIdAndUpdate("5f3b738679041343de0d8b28",{children:[]},{new: true, upsert: true, setDefaultsOnInsert: true},(err,res)=>{
    //     if(err)
    //         throw err;
    //     console.log(res);
    // })
    // console.log(await Template.retrieve("5f215e4eca32cc5faca29122"))


})

//Project 2
(async()=>{
    let classes

   
    let div000=new Container({
            tag:'img',
            classlist:"",
            contents:{src:"/project.jpg"},
        })

    classes="btn col-auto"
    let div0010=new Container({
        tag:'a',
        classlist:classes.split(' '),
        contents:{
            text:"EJS"
        }
    })
    console.log(div0010.classlist)
    let div0011=new Container({
        tag:'a',
        classlist:classes.split(' '),
        contents:{
            text:"SemanticUI"
        }
    })
    let div0012=new Container({
        tag:'a',
        classlist:classes.split(' '),
        contents:{
            text:"JavaScript"
        }
    })
    let div0013=new Container({
        tag:'a',
        classlist:classes.split(' '),
        contents:{
            text:"NodeJS"
        }
    })
    let div0014=new Container({
        tag:'a',
        classlist:classes.split(' '),
        contents:{
            text:"MySQL"
        }
    })

    classes="project-stack d-inline-flex flex-row flex-wrap mt-2"
    let div001=new Container({
        tag:'div',
        styles:{
            "color": "#f76160"
        },
        classlist:classes.split(' '),
        children:[div0010._id,div0011._id,div0012._id,div0013._id,div0014._id]
    })

    classes="font-weight-bold"
    let div0020=new Container({
        tag:'a',
        classlist:classes.split(' '),
        contents:{
            text:"UCritic Source Code",
            href:"https://github.com/krishnakanna18/UCritic",
            target:"_blank"
        },
        styles:{
            "color": "#fff",
            "font-size": "larger"
        }
    })

    classes="mt-n3"
    let div002=new Container({
        tag:'div',
        classlist:classes.split(' '),
        children:[div0020._id]
    })

    classes="font-weight-bold"
    let div0030=new Container({
        tag:'p',
        classlist:classes.split(' '),
        contents:{
            text:"Ongoing",
        },
    })

    classes="mt-n4"
    let div003=new Container({
        tag:'div',
        classlist:classes.split(' '),
        children:[div0030._id]
    })

    classes="col-lg-6 d-flex flex-column"
    let div00=new Container({
        tag:'div',
        classlist:classes.split(' '),
        children:[div000._id,div001._id,div002._id,div003._id]
    })
    
    classes="font-weight-bold"
    let div010=new Container({
        tag:'p',
        classlist:classes.split(' '),
        contents:{
            text:"UCritic",
        },
        styles:{
            "font-size": "xx-large"
        }
    })

    classes="mt-n3 link"
    let div011=new Container({
        tag:'p',
        classlist:classes.split(' '),
        contents:{
            text:"A Social Media for cinema enthusiasts",
        }
    })

    let div012=new Container({
        tag:'p',
        contents:{
            text:"This web application lets users connect with each other and share their thoughts and opinions on movies and tv series. A network of people that enables them to appreciate and express their opinions and get opinions from their friends or trusted network about movies or television across any genre , time period"
        },
        styles:{
            "font-size": "larger"
        }
    })

    classes="col-md-6 d-flex flex-column project-description"
    let div01=new Container({
        tag:'div',
        classlist:classes.split(' '),
        children:[div010._id,div011._id,div012._id]
    })

    classes="col-lg-6 d-flex flex-md-row flex-column project"
    let div0=new Container({
        tag:'div',
        classlist:classes.split(' '),
        children:[div00._id,div01._id],
        styles:{
            "background-color":"#f76160"
        }
    })
    console.log(div0.classlist)

    // let ids=await insert(div00,div000,div001,div0010,div0011,div0012,div0013,div0014,div002,div0020,div003,div0030,div01,div010,div011,div012,div0)





    // classes="col-md-6 d-flex flex-column"
    // let div00=new Container({
    //         tag:'div'

    // })
    // classes="col-lg-6 d-flex flex-md-row flex-column project"
    // let div0=new Container({
    //         tag:'div',
    //         classlist:classes.split(' '),
    //         styles:{
                    // "background-color":"7dcc93"
    //         },
    //     })
    
    // let ids=await insert(div0)
    // console.log(ids)
    // Template.findByIdAndUpdate("5f215e4eca32cc5faca29122",{$push:{containers:div0._id}},{new: true, upsert: true, setDefaultsOnInsert: true},(err,res)=>{
    //     if(err)
    //         throw err;
    //     console.log(res)

    // })
    Container.findByIdAndUpdate("5f3b738679041343de0d8b28",{$push:{children:div0._id}},{new: true, upsert: true, setDefaultsOnInsert: true},(err,res)=>{
        if(err)
            throw err;
        console.log(res);
    })

    // Container.findByIdAndUpdate("5f3b738679041343de0d8b28",{$pull:{children:"5f3bed94cc15f061b673b84e"}},{new: true, upsert: true, setDefaultsOnInsert: true},(err,res)=>{
    //     if(err)
    //         throw err;
    //     console.log(res);
    // })

    // Container.findById("5f3b738679041343de0d8b28",(err,res)=>{
    //     console.log(res.children)
    // })

    // Container.findByIdAndUpdate("5f3b738679041343de0d8b28",{children:[]},{new: true, upsert: true, setDefaultsOnInsert: true},(err,res)=>{
    //     if(err)
    //         throw err;
    //     console.log(res);
    // })
    // console.log(await Template.retrieve("5f215e4eca32cc5faca29122"))


})

//Project 3
(async()=>{
    let classes

   
    let div000=new Container({
            tag:'img',
            classlist:"",
            contents:{src:"/project.jpg"},
        })

    classes="btn col-auto"
    let div0010=new Container({
        tag:'a',
        classlist:classes.split(' '),
        contents:{
            text:"Python"
        }
    })
    console.log(div0010.classlist)
    let div0011=new Container({
        tag:'a',
        classlist:classes.split(' '),
        contents:{
            text:"Huffaman Encoding"
        }
    })
    let div0012=new Container({
        tag:'a',
        classlist:classes.split(' '),
        contents:{
            text:"File System"
        }
    })
   
    

    classes="project-stack d-inline-flex flex-row flex-wrap mt-2"
    let div001=new Container({
        tag:'div',
        styles:{
            "color": "#E29470"
        },
        classlist:classes.split(' '),
        children:[div0010._id,div0011._id,div0012._id]
    })

    classes="font-weight-bold"
    let div0020=new Container({
        tag:'a',
        classlist:classes.split(' '),
        contents:{
            text:"UCritic Source Code",
            href:"https://github.com/krishnakanna18/UCritic",
            target:"_blank"
        },
        styles:{
            "color": "#fff",
            "font-size": "larger"
        }
    })

    classes="mt-n3"
    let div002=new Container({
        tag:'div',
        classlist:classes.split(' '),
        children:[div0020._id]
    })

    classes="font-weight-bold"
    let div0030=new Container({
        tag:'p',
        classlist:classes.split(' '),
        contents:{
            text:"Completed 2020",
        },
    })

    classes="mt-n4"
    let div003=new Container({
        tag:'div',
        classlist:classes.split(' '),
        children:[div0030._id]
    })

    classes="col-lg-6 d-flex flex-column"
    let div00=new Container({
        tag:'div',
        classlist:classes.split(' '),
        children:[div000._id,div001._id,div002._id,div003._id]
    })
    
    classes="font-weight-bold"
    let div010=new Container({
        tag:'p',
        classlist:classes.split(' '),
        contents:{
            text:"Text File Compressor",
        },
        styles:{
            "font-size": "xx-large"
        }
    })

    classes="mt-n3 link"
    let div011=new Container({
        tag:'p',
        classlist:classes.split(' '),
        contents:{
            text:"Compress text files to binary",
        }
    })

    let div012=new Container({
        tag:'p',
        contents:{
            text:"This project aims to compress a text file by encoding it in binary format using Huffman encoding algorithm. Can compress text files of size up to 1.5 megabytes with maximum compress ratio of 66%."
        },
        styles:{
            "font-size": "larger"
        }
    })

    classes="col-md-6 d-flex flex-column project-description"
    let div01=new Container({
        tag:'div',
        classlist:classes.split(' '),
        children:[div010._id,div011._id,div012._id]
    })

    classes="col-lg-6 d-flex flex-md-row flex-column project"
    let div0=new Container({
        tag:'div',
        classlist:classes.split(' '),
        children:[div00._id,div01._id],
        styles:{
            "background-color":"#E29470"
        }
    })
    console.log(div0.classlist)

    let ids=await insert(div00,div000,div001,div0010,div0011,div0012,div002,div0020,div003,div0030,div01,div010,div011,div012,div0)





    // classes="col-md-6 d-flex flex-column"
    // let div00=new Container({
    //         tag:'div'

    // })
    // classes="col-lg-6 d-flex flex-md-row flex-column project"
    // let div0=new Container({
    //         tag:'div',
    //         classlist:classes.split(' '),
    //         styles:{
                    // "background-color":"7dcc93"
    //         },
    //     })
    
    // let ids=await insert(div0)
    // console.log(ids)
    // Template.findByIdAndUpdate("5f215e4eca32cc5faca29122",{$push:{containers:div0._id}},{new: true, upsert: true, setDefaultsOnInsert: true},(err,res)=>{
    //     if(err)
    //         throw err;
    //     console.log(res)

    // })
    Container.findByIdAndUpdate("5f3b738679041343de0d8b28",{$push:{children:div0._id}},{new: true, upsert: true, setDefaultsOnInsert: true},(err,res)=>{
        if(err)
            throw err;
        console.log(res);
    })

    // Container.findByIdAndUpdate("5f3b738679041343de0d8b28",{$pull:{children:"5f3bed94cc15f061b673b84e"}},{new: true, upsert: true, setDefaultsOnInsert: true},(err,res)=>{
    //     if(err)
    //         throw err;
    //     console.log(res);
    // })

    // Container.findById("5f3b738679041343de0d8b28",(err,res)=>{
    //     console.log(res.children)
    // })

    // Container.findByIdAndUpdate("5f3b738679041343de0d8b28",{children:[]},{new: true, upsert: true, setDefaultsOnInsert: true},(err,res)=>{
    //     if(err)
    //         throw err;
    //     console.log(res);
    // })
    // console.log(await Template.retrieve("5f215e4eca32cc5faca29122"))


})

(async()=>{
    let classes

   
    let div000=new Container({
            tag:'img',
            classlist:"",
            contents:{src:"/project.jpg"},
        })

    classes="btn col-auto"
    let div0010=new Container({
        tag:'a',
        classlist:classes.split(' '),
        contents:{
            text:"Python"
        }
    })
    console.log(div0010.classlist)
    let div0011=new Container({
        tag:'a',
        classlist:classes.split(' '),
        contents:{
            text:"Tkinter"
        }
    })
  
   
    

    classes="project-stack d-inline-flex flex-row flex-wrap mt-2"
    let div001=new Container({
        tag:'div',
        styles:{
            "color": "#66A7D5 "
        },
        classlist:classes.split(' '),
        children:[div0010._id,div0011._id]
    })

    classes="font-weight-bold"
    let div0020=new Container({
        tag:'a',
        classlist:classes.split(' '),
        contents:{
            text:"UCritic Source Code",
            href:"https://github.com/krishnakanna18/UCritic",
            target:"_blank"
        },
        styles:{
            "color": "#fff",
            "font-size": "larger"
        }
    })

    classes="mt-n3"
    let div002=new Container({
        tag:'div',
        classlist:classes.split(' '),
        children:[div0020._id]
    })

    classes="font-weight-bold"
    let div0030=new Container({
        tag:'p',
        classlist:classes.split(' '),
        contents:{
            text:"Completed 2020",
        },
    })

    classes="mt-n4"
    let div003=new Container({
        tag:'div',
        classlist:classes.split(' '),
        children:[div0030._id]
    })

    classes="col-lg-6 d-flex flex-column"
    let div00=new Container({
        tag:'div',
        classlist:classes.split(' '),
        children:[div000._id,div001._id,div002._id,div003._id]
    })
    
    classes="font-weight-bold"
    let div010=new Container({
        tag:'p',
        classlist:classes.split(' '),
        contents:{
            text:"Text File Compressor",
        },
        styles:{
            "font-size": "xx-large"
        }
    })

    classes="mt-n3 link"
    let div011=new Container({
        tag:'p',
        classlist:classes.split(' '),
        contents:{
            text:"Find shortest path ",
        }
    })

    let div012=new Container({
        tag:'p',
        contents:{
            text:"This desktop application aims to visualize the shortest path between two points using A* search algorithm. A restricted set of coordinates can be added through which the path cannot pass."
        },
        styles:{
            "font-size": "larger"
        }
    })

    classes="col-md-6 d-flex flex-column project-description"
    let div01=new Container({
        tag:'div',
        classlist:classes.split(' '),
        children:[div010._id,div011._id,div012._id]
    })

    classes="col-lg-6 d-flex flex-md-row flex-column project"
    let div0=new Container({
        tag:'div',
        classlist:classes.split(' '),
        children:[div00._id,div01._id],
        styles:{
            "background-color":"#66A7D5"
        }
    })
    console.log(div0.classlist)

    let ids=await insert(div00,div000,div001,div0010,div0011,div002,div0020,div003,div0030,div01,div010,div011,div012,div0)





    // classes="col-md-6 d-flex flex-column"
    // let div00=new Container({
    //         tag:'div'

    // })
    // classes="col-lg-6 d-flex flex-md-row flex-column project"
    // let div0=new Container({
    //         tag:'div',
    //         classlist:classes.split(' '),
    //         styles:{
                    // "background-color":"7dcc93"
    //         },
    //     })
    
    // let ids=await insert(div0)
    // console.log(ids)
    // Template.findByIdAndUpdate("5f215e4eca32cc5faca29122",{$push:{containers:div0._id}},{new: true, upsert: true, setDefaultsOnInsert: true},(err,res)=>{
    //     if(err)
    //         throw err;
    //     console.log(res)

    // })
    Container.findByIdAndUpdate("5f3b738679041343de0d8b28",{$push:{children:div0._id}},{new: true, upsert: true, setDefaultsOnInsert: true},(err,res)=>{
        if(err)
            throw err;
        console.log(res);
    })

    // Container.findByIdAndUpdate("5f3b738679041343de0d8b28",{$pull:{children:"5f3bed94cc15f061b673b84e"}},{new: true, upsert: true, setDefaultsOnInsert: true},(err,res)=>{
    //     if(err)
    //         throw err;
    //     console.log(res);
    // })

    // Container.findById("5f3b738679041343de0d8b28",(err,res)=>{
    //     console.log(res.children)
    // })

    // Container.findByIdAndUpdate("5f3b738679041343de0d8b28",{children:[]},{new: true, upsert: true, setDefaultsOnInsert: true},(err,res)=>{
    //     if(err)
    //         throw err;
    //     console.log(res);
    // })
    // console.log(await Template.retrieve("5f215e4eca32cc5faca29122"))


})()