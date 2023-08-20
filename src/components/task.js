import React from "react";

const Task = ({taskEL}) =>{

const edit = taskEL.elClassName === "editing" ?
<input type="text" className="edit" defaultValue="Editing task"></input> :
false;

return(
    <li className={taskEL.elClassName}>
    <div className="view">
        <input className="toggle" type="checkbox"></input>
        <label>
          <span className="description">{taskEL.text}</span> 
          <span className="created">{taskEL.time}</span> 
        </label> 
        <button className="icon icon-edit"></button>
        <button className="icon icon-destroy"></button>
    </div>
   {edit} 
  </li>
  )
}

export default Task;