import React from "react";
import './task-list.css'
import Task from '../task/task'

const TaskList = ({taskli, onDelete}) => {
   
    const elements = taskli.map(el => {
        return <Task taskEL={el}
                     onDelete={() => onDelete(el.id)}
        />
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