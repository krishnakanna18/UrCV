

let fun=()=>{
    let a=1,b=2,c=79;
    return {a,b,c}
}
let {a,b,c}=fun()
console.log(a,b,c)

let test=(s="ra")=>{
    console.log(s)
}
test("Krisna")
test()