import React, { Component} from "react";
import { createRoot } from 'react-dom/client';
import './style.css'

import NewTaskForm from "./components/new-task-form";
import TaskList from "./components/task-list/task-list";
import Footer from "./components/footer/footer";

class TodoApp extends Component{
    state = {
        styleLi: [
            {elClassName: '',text: 'Completed task',time:'created 17 seconds ago', id: 'Ct'},
            {elClassName: '' ,text: "Editing task" ,time:'created 5 minutes ago', id: 'Ed'},
            {elClassName: '',text: "Active task",time:'created 5 minutes ago', id: 'At'}
        ]
    };

    deleted = (id) =>{
     this.setState(({styleLi}) => {
         const index = styleLi.findIndex(el => el.id === id);
         const newArr = [ ...styleLi.slice(0, index),
             ...styleLi.slice(index + 1)];
         return{
             styleLi: newArr
         }
     })
    }

   render() {
       return(
           <section className="todoapp">
               <NewTaskForm />
               <TaskList
                   taskli={this.state.styleLi}
                   onDelete={this.deleted}
               />
               <Footer />
           </section>
       );
   }
}

const container = createRoot(document.getElementById('root'));

container.render(<TodoApp />)