let fs=require("fs")
let skills=fs.readFileSync('./tools.json')
skills=JSON.parse(skills)    
// console.log(skills)
let special=new Set()
skills.map((skill)=>skill.tool.toLowerCase()).filter((skill)=>{
    // console.log(skill)
    for(let i=0; i<skill.length; i++)
        {
            let c=skill[i].charCodeAt(0);

            if(c<97 || c>122){
                special.add(skill[i])
            }
           
        }
})
console.log(special)
// process.stdout.write(special)