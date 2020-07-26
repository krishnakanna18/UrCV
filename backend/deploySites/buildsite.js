const vari=[{"template":{"profession":"Dev","tname":"1"},"_id":"5f144743e0b00b4e394ad56e","avatar":"https://img.icons8.com/color/48/000000/ozil.png","menu":[{"_id":"5f144743e0b00b4e394ad56f","title":"Home","href":"#"},{"_id":"5f144743e0b00b4e394ad570","title":"About","href":"#01"},{"_id":"5f144743e0b00b4e394ad571","title":"Projects","href":"#10"},{"_id":"5f144743e0b00b4e394ad572","title":"Contact","href":"#00"},{"_id":"5f144743e0b00b4e394ad573","title":"MEMES","href":"https://reddit.com"}],"Containers":[{"Inner":[{"_id":"5f144743e0b00b4e394ad575","component_id":1,"Title":"U son of a bitch im in","Sub":"i m in a "},{"_id":"5f144743e0b00b4e394ad576","component_id":2,"img":"https://html.nkdev.info/skylith/assets/images/promo-header-demos.png"}],"_id":"5f144743e0b00b4e394ad574","container_id":0,"bgImage":"https://html.nkdev.info/skylith/assets/images/screenshot-demo-minimal-classic-agency.jpg"},{"Inner":[{"_id":"5f144743e0b00b4e394ad578","component_id":0,"Sub":"Its Actually Working","img":"https://html.nkdev.info/skylith/assets/images/screenshot-demo-minimal-classic-agency.jpg","Title":"Iam going to do it"},{"_id":"5f144743e0b00b4e394ad579","component_id":1,"Sub":"It aint so bad","img":"https://html.nkdev.info/skylith/assets/images/screenshot-demo-dark-creative-agency.jpg","Title":"Create a relpica"},{"_id":"5f144743e0b00b4e394ad57a","component_id":2,"Sub":"No need to submit it or anything","img":"https://html.nkdev.info/skylith/assets/images/screenshot-demo-minimal-carousel-portfolio.jpg","Title":" AUtoSavE"}],"_id":"5f144743e0b00b4e394ad577","container_id":1}],"__v":0}]
const website=JSON.parse(JSON.stringify(vari));
console.log(website[0]);
let nav=document.querySelector("ul");
console.log(nav);
for(let option of website[0]["menu"]){
    let link=document.createElement("a")
    link.setAttribute('href',`${option.href}`)
    link.classList.add('nav-link')
    link.appendChild(document.createTextNode(`${option.title}`))
    let list=document.createElement("li");
    list.appendChild(link);
    nav.appendChild(list)
}
let list=document.getElementById("list");
for(let ele of website[0].Containers[1].Inner){
    let img=document.createElement("img");
    img.setAttribute('src',`${ele.img}`);
    img.classList.add('img-fluid');
    let span=document.createElement("span");
    span.appendChild(document.createTextNode(`${ele.Title}`))
    span.appendChild(document.createTextNode(`${ele.Sub}`))
    let div=document.createElement("div");
    div.classList.add("mt-5","col-lg-4","col-md-6", "col-sm-12");
    div.appendChild(img);
    div.appendChild(span);
    list.appendChild(div);
}