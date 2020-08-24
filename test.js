// let m;
// class r{
//     constructor(){
//         this.func=this.func.bind(this)
//     }
//     func(a,b){

//         console.log(a,"is a",b);
//     }

//     ha(){
//         return [this.func.bind(this),[1,2]]
//     }
// }
// let k=new r();
// let y=k.ha();
// y[0].apply(y,y[1])
function f(c,b){
    c+=10;
}
let k=10;
f(k,1);
console.log(k)