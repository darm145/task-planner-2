import React from 'react';
import {Todo} from './Todo'

export class TodoList extends React.Component{
   
    render(){
        const list=this.props.items.map((Obj,i) =>
           <Todo key={i}
           res={Obj}/>
           
        );
        
        
        return (
            <div className="insertTask"> {list} </div>
            
        );
    }
}