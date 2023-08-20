import React from "react";
import './task-list.css'
import Task from './task'

const TaskList = ({taskli}) => {
   
    const elements = taskli.map(el => {
        return <Task taskEL={el} />
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