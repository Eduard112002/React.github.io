import React, { Component } from 'react';
import './tasks-filter.css';

class TasksFilter extends Component {
  render() {
    const { butEl } = this.props;
    let classNAme = '';
    if (butEl.selected) {
      classNAme += ' selected';
    }
    return (
      <button id={butEl.id} onClick={this.props.conditionTodo} className={classNAme}>
        {butEl.text}
      </button>
    );
  }
}

export default TasksFilter;
