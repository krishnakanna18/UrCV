const vari=[{"template":{"tname":"1","tid":"0"},"_id":"5f1960e6ae19995738827339","avatar":"https://img.icons8.com/color/48/000000/ozil.png","menu":[{"classList":["nav-link"],"_id":"5f1960e6ae1999573882733a","title":"Home","href":"#"},{"classList":["nav-link"],"_id":"5f1960e6ae1999573882733b","title":"About","href":"#01"},{"classList":["nav-link"],"_id":"5f1960e6ae1999573882733c","title":"Projects","href":"#10"},{"classList":["nav-link"],"_id":"5f1960e6ae1999573882733d","title":"Contact","href":"#00"},{"classList":["nav-link"],"_id":"5f1960e6ae1999573882733e","title":"MEMES","href":"https://reddit.com"}],"Containers":[{"container_location":"#","classList":[],"Inner":[{"styles":{"Title":[],"Sub":[],"Desc":[]},"classList":["justify-content-center","d-flex","flex-cloumn"],"_id":"5f1960e6ae19995738827340","component_id":1,"Title":"Create Your beautiful Website with skylith","Sub":"30+ Unique Designs Offered"},{"styles":{"Title":[],"Sub":[],"Desc":[]},"classList":["justify-content-center","d-flex","flex-cloumn"],"_id":"5f1960e6ae19995738827341","component_id":2,"img":"https://html.nkdev.info/skylith/assets/images/promo-header-demos.png"}],"_id":"5f1960e6ae1999573882733f","container_id":0,"container_name":"topcontainer","container_type":"div","bgImage":"https://html.nkdev.info/skylith/assets/images/screenshot-demo-minimal-classic-agency.jpg"},{"container_location":"#","classList":["d-flex container-fluid "],"Inner":[{"styles":{"Title":[],"Sub":[],"Desc":[]},"classList":["col-lg-4 col-md-6 col-sm-12"],"_id":"5f1960e6ae19995738827343","component_id":0,"Sub":"BBBBAAD!","img":"https://html.nkdev.info/skylith/assets/images/screenshot-demo-minimal-classic-agency.jpg"},{"styles":{"Title":[],"Sub":[],"Desc":[]},"classList":["col-lg-4 col-md-6 col-sm-12"],"_id":"5f1960e6ae19995738827344","component_id":1,"Sub":"BBBBAAD!","img":"https://html.nkdev.info/skylith/assets/images/screenshot-demo-dark-creative-agency.jpg"},{"styles":{"Title":[],"Sub":[],"Desc":[]},"classList":["col-lg-4 col-md-6 col-sm-12"],"_id":"5f1960e6ae19995738827345","component_id":2,"Sub":"BBBBAAD!","img":"https://html.nkdev.info/skylith/assets/images/screenshot-demo-minimal-carousel-portfolio.jpg"}],"_id":"5f1960e6ae19995738827342","container_id":1,"container_name":"midcontainer","container_type":"row"}],"footer":[],"__v":0}]
const website=JSON.parse(JSON.stringify(vari))[0];
let nav=document.querySelector("#nav");
let create=(element,classes,style=undefined)=>{
    let div=document.createElement(element);
    let classList=classes.join(" ");
    console.log(classList);
    for(let clas of classes){
        div.classList.add(clas);
    };
    return div;
}
let divnav=create("div",["container","justify-content-end"])
let ul=create("ul",["navbar-nav","d-flex","flex-sm-row","justify-content-sm-around"]);
divnav.appendChild(ul);
for(let option of website.menu){
    let li=create("li",["nav-item"]);
    let a=create("a",["nav-link"]);
    a.innerText=`${option.title}`
    a.setAttribute("href",`${option.href}`)
    li.appendChild(a);
    ul.appendChild(li);
    
}
nav.appendChild(divnav);