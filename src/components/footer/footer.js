import React from "react";
import "./footer.css"
import TasksFilter from "../tasks-filter/tasks-filter";

const Footer = ({doNe, conditionTodo, clearCompleted, butEL}) => {
    const elements =  butEL.map(el => {
    return (
        <li key={el.id }>
        <TasksFilter butEl={el}
                     conditionTodo={() => conditionTodo(el.text, el.id)}
        />
        </li>
    )
});

return(
   <footer className="footer">
     <span className="todo-count"> {doNe} items left</span>
     <ul className="filters">
       {elements}
     </ul>
     <button onClick={clearCompleted} className="clear-completed">Clear completed</button>
   </footer> 
)
}
//
export default Footer;