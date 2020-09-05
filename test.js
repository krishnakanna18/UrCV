let test={
    a:{
        b:[
            {
                a:{
                    b:[
                        {
                            text:"Back at u bitch"
                        },
                        {
                            text:"I'm vengeance"
                        },
                        

                    ],
                    c:{
                        one:1,
                        two:2
                    },
                }
            },
            {
                a:{
                    b:[
                        {
                            text:"I'm the night"
                        },
                        {
                            text:"I'm batman"
                        }

                    ],
                    c:{
                        one:1,
                        two:2
                    },

                }
            }
        ],
        c:{},

        
    }
}

let obj2={...test}
// console.log(`${obj2},${test}`);
ob=[...obj2.a.b[0].a.b]
ob=undefined
console.log(`${obj2.a.b[0].a.b[0].text},${test.a.b[0].a.b[1].text}`);
