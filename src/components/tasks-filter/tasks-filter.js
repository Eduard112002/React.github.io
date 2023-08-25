import React from "react";
import "./tasks-filter.css";

const TasksFilter = ({butEl}) => {

    return (
        <li key={butEl.id }>
            <button className={butEl.className}>{butEl.text}</button>
        </li>
    )
}

export default TasksFilter;