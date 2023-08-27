import React from "react";
import './task-list.css'
import Task from '../task/task'

const TaskList = ({taskli, onDelete, onLabelDone}) => {
   
    const elements = taskli.map( (el) => {
        return (
            <li key={ el.id }>
                <Task taskEL={el}
                      onDelete={() => onDelete(el.id)}
                      onLabelDone={() => onLabelDone(el.id)}
                />
            </li>
        )
    })

    return (
    <section className="main">
      <ul className="todo-list">
           {elements}
      </ul>
    </section>
 )
}



export default TaskList;