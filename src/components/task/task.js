import React, { Component } from "react";

class Task extends Component{

     state ={
       done: false
     }

    onLabelDone = () => {
       this.setState(({done}) => {
          return {
              done: !done
          }
        })
    }

    render() {

        const {taskEL} = this.props;

        let classNAme = 'description';
        if(this.state.done){
            classNAme += ' done'
        }

        return(
            <li className={taskEL.elClassName} >
                <div className="view">
                    <input id={taskEL.id} className="toggle " type="checkbox" onClick={this.onLabelDone}></input>
                    <label htmlFor={taskEL.id}>
                        <span className={classNAme}>{taskEL.text}</span>
                        <span className="created">{taskEL.time}</span>
                    </label>
                    <button className="icon icon-edit"></button>
                    <button className="icon icon-destroy" onClick={this.props.onDelete}></button>
                </div>
            </li>
            )
    }
}

export default Task;