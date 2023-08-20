import React from "react";
import "./footer.css"
import TasksFilter from "./tasks-filter";

const Footer = () => {
   const butEL = [
    {text: 'All', className: 'selected'},
    {text: 'Active', className: ''},
    {text: 'Completed', className: ''}
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