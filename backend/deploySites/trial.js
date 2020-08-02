let obj={x:1,arr:[1,2,3]}
let n={...obj}
console.log(n)
function func(...args){
    console.log(arguments);
}(1,2,3,4,4);
(async()=>{
    let num=[1,2,3]
    let [one,two,th]=await Promise.all(num.map(async(number)=>{
        return  setTimeout(()=>number*number,10);
    }))
    console.log(one);


})()
let arr=[]
console.log(arr===undefined)
// func(1,2,3,4,[5,6])