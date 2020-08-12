class Node{
    constructor(value,index=-1){
        this.index=index
        this.isEnd=false
        if(index!==-1)
            this.isEnd=true
        this.value=value
        this.children=[];
    }

    addIndex(index){
        this.index=index
        this.isEnd=true

    }

}
// console.log(new Node("a").fund())
class Trie{
    constructor(options=undefined){
        this.root=new Node("")
        if(options)
            this.construct(options);
    }

    construct(options){
        options.forEach((option,index)=>this.add(option,index))
    }

    asciimap(character){
        let value=character.charCodeAt(0)
        if(value>=97 && value<=122)
            return value-'a'.charCodeAt(0)
        if(value>=48 && value<=57)
            return value-22
        let ascii={
                32:36,          //' '
                35:37,          //'#'
                43:38,          //'+'
                45:39,          //'-'
                46:40,          //'.'
                47:41,          //'/'
                92:42,          //'\'
            }
        return ascii[value];
        
        
    }

    add(string,index){
        let len=string.length;
        let parent=this.root;
        string=string.toLowerCase();
        for(let i=0; i<len; i++){
            let id=this.asciimap(string[i])
            if(!parent.children[id]){
                if(i===len-1){
                    parent.children[id]=new Node(string[i],index)
                }
                else
                    parent.children[id]=new Node(string[i])
            }
            if(i===len-1){
                parent.children[id].addIndex(index)
            }
            // console.log(parent.children[id],parent.children.length)
            parent=parent.children[id]

        }
    }

   
    search(prefix){
        prefix=prefix.toLowerCase()
        let root=this.root,len=prefix.length
        for(let i=0; i<len; i++){
            let id=this.asciimap(prefix[i])
            if(root.children[id])
                {
                    root=root.children[id]
                    if(i===len-1)
                        return root;
                    continue;
                }
        }
        return undefined
    }


     recurse(root,prefix,string,strings){
        if(root===undefined)
            return
         if(root.children.length===0 )
            {
                string+=`${root.value}`
                string=`${prefix}${string}`
                strings.push({string,index:root.index})
                return
            }

        if(root.isEnd===true){
            strings.push({string:`${prefix}${string}${root.value}`,index:root.index})

        }


        for(let i=0; i<root.children.length; i++)
            if(root.children[i])
                this.recurse(root.children[i],prefix,string+`${root.value}`,strings)
         
    }


    retrieve(prefix){
        let root=this.search(prefix)
        prefix=prefix.toLowerCase().slice(0,prefix.length-1)
        let strings=[]
        this.recurse(root,prefix,"",strings)
        console.log(strings.map((string)=>string.string))
        console.log(strings)


    }


}

let options=["Pe/+++/. aer","Pe/ tAnimal","pe/","Pip1+er","Picked","Peck","Pickled","pic","pip","kkkkkkkkkkkkkk"]
// let options=["krishna","krish","kri","k"]
let trie=new Trie(options)
// trie.add("KkKkKk",0)
// trie.add("Peter",0)
// trie.add("Piper",1)
// trie.add("Picked",2)
// trie.add("Peck",3)
// trie.add("Pickled",4)
// trie.add("Peppers",5)
// console.log(trie.search("K"))
trie.retrieve("p")
// console.log(trie.search("Chi"))