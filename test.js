// let fs=require("fs")
// let skills=fs.readFileSync('./tools.json')
// skills=JSON.parse(skills)    
// // console.log(skills)
// let special=new Set()
// skills.map((skill)=>skill.tool.toLowerCase()).filter((skill)=>{
//     // console.log(skill)
//     for(let i=0; i<skill.length; i++)
//         {
//             let c=skill[i].charCodeAt(0);

//             if(c<97 || c>122){
//                 special.add(skill[i])
//             }
           
//         }
// })
// console.log(special)
// process.stdout.write(special)

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
console.log({"max-width":"1583px","background-color":"#7fffde"})
 console.log(styleParser({"width":"1583px","background-color":"#7fffde"}))