import React, { Component} from "react";
import "./tasks-filter.css";

class TasksFilter extends Component{

    render() {
        const {butEl} = this.props;
        return (
                <button  id={butEl.id} onClick={this.props.conditionTodo} className={butEl.className}>{butEl.text}</button>
        );
    }
}

export default TasksFilter;
