document.title=site.name

let body=document.body


let convertToHtml=(component)=>{
    if(component===undefined || component===null) return ;

    let cur=document.createElement(component.tag)

    if(component.classlist && component.classlist.length>0)
        for(let cls of component.classlist) 
        if(cls) cur.classList.add(cls)

    if(component.styles!==undefined)
        Object.keys(component.styles).forEach(styl=>{
            
            cur.style[styl]=component.styles[styl]
        })
    if(component.tag==="p" || component.tag==="span" || component.tag==="a")
        cur.textContent=component.contents["text"]



    else if(component.tag==="img")
        cur.setAttribute('src',component.contents['src'])

    else if(component.tag==="a"){
        Object.keys(component.contents).forEach(key=>{
            cur.setAttribute(`${key}`,component.contents[key])
        })
        console.log(component.contents)

    }

    if(component.children && component.children.length===0)
        return cur

    let children=component.children.map(child=>convertToHtml(child))
    for(let child of children)  cur.appendChild(child)
    return cur

}

for(let container of site.containers)
    body.appendChild(convertToHtml(container))







