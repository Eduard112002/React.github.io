import React, { Component } from "react";

class Task extends Component{

     state ={
       done: false
     }


    render() {
        const {label, time, id, done} = this.props.taskEL;
        const {onLabelDone, onDelete} = this.props;
        let classNAme = 'description';
        if(done){
            classNAme += ' done'
        }
        return(
                <div className="view">
                    <input id={id} className="toggle " type="checkbox" onClick={onLabelDone} defaultChecked={done}></input>
                    <label htmlFor={id}>
                        <span className={classNAme}>{label}</span>
                        <span className="created">{time}</span>
                    </label>
                    <button className="icon icon-edit"></button>
                    <button className="icon icon-destroy" onClick={onDelete}></button>
                </div>
            )
    }
}

export default Task;