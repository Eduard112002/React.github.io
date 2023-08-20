import React from "react";
import "./tasks-filter.css";
const TasksFilter = ({butEl}) => { 
    return (
        <li>
            <button className={butEl}>{butEl.text}</button>
        </li>
    )
}

export default TasksFilter;