import React from "react";
import "./footer.css"
import TasksFilter from "../tasks-filter/tasks-filter";

const Footer = () => {
   const butEL = [
    {text: 'All', className: 'selected', id: 'Al'},
    {text: 'Active', className: '', id: 'Ac'},
    {text: 'Completed', className: '', id: 'Com'}
   ]; 

const elements =  butEL.map(el => <TasksFilter butEl={el}/>)
   
return(
   <footer className="footer">
     <span className="todo-count">1 items left</span>
     <ul className="filters">
       {elements}
     </ul>
     <button className="clear-completed">Clear completed</button> 
   </footer> 
)
}

export default Footer;