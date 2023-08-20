import React from "react";
import { createRoot } from 'react-dom/client';
import './style.css'

import NewTaskForm from "./components/new-task-form ";
import TaskList from "./components/task-list";
import Footer from "./components/footer";

const TodoApp = () =>{
    const styleLi = [
        {elClassName: 'completed',text: 'Completed task',time:'created 17 seconds ago'},
        {elClassName: 'editing' ,text: "Editing task" ,time:'created 5 minutes ago'},
        {elClassName: '',text: "Active task",time:'created 5 minutes ago'}
    ];

    return(
        <section className="todoapp">
            <NewTaskForm />
            <TaskList taskli={styleLi}/>
            <Footer />
        </section>
    );
};

const container = createRoot(document.body);

container.render(<TodoApp />)