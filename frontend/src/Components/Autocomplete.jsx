import React, { Component } from 'react';

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
        return strings


    }


}


class Autocomplete extends Component {
    constructor(props){
        super(props);
        this.state={filtered_list:[],
                    active:false,
                    active_index:0,
                    input:"",
                    trie:new Trie(this.props.options) }
    }

    changeInput(e){
        // console.log(e.target.value)
        let filtered_list=this.state.trie.retrieve(e.target.value)
        this.setState({input:e.target.value,active:true,active_index:0,filtered_list})
    }

    selectSkill(e){
        console.log(e.keyCode)
        const {active_index,filtered_list}=this.state;
        if(e.keyCode===13){
            this.setState({
                active_index:0,
                input:filtered_list[active_index].string,
                active:false,
            })
            console.log("The selected index",filtered_list[active_index].index)
        }
        else if(e.keyCode===38){
            if(active_index===0)
                return;
            this.setState({
                active_index:active_index-1,
                input:filtered_list[active_index-1].string,
                active:true
            })
        }
        else if(e.keyCode===40){
            if(active_index===filtered_list.length-1)
                return;
            this.setState({
                active_index:active_index+1,
                input:filtered_list[active_index+1].string,
                active:true
            })
        }

    }

    clickSkill(e,index){
        let text=e.target.innerText
        console.log("The select index",index)
        this.setState({
            active_index:0,
            input:text,
            active:false,
        })


    }

    displayMatches(){
        if(this.state.active)
        {
            const {filtered_list,active_index}=this.state;
            return(
                <React.Fragment>
                    <div className="d-flex flex-column">
                    {filtered_list.map((skill,index)=>{
                        let active_class=""
                        if(active_index===index)
                            active_class={backgroundColor: "rgb(245, 255, 250)"}
                        return(
                            <div className="col" 
                                 key={`${index}`}
                                 style={{active_class}}
                                 onClick={(e)=>this.clickSkill(e,skill.index)}
                            >
                                {skill.string}
                            </div>
                        )
                    })}
                    </div>
                </React.Fragment>
            )
        }
        
    }

    render(){
        return(
            <React.Fragment>
                <div className="d-flex flex-column">
                    <input type="search" id="skill-search" className="form-control mb-2 mt-2 " placeholder="Add a language, framework, database.."
                     value={`${this.state.input}`}
                     onChange={(e)=>this.changeInput(e)}
                     onKeyDown={(e)=>this.selectSkill(e)}
                    >
                    </input>
                    {this.displayMatches()}
                </div>
            </React.Fragment>
        )
    }
}
 
export default Autocomplete;