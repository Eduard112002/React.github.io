import React, { Component } from 'react';
import './task-list.css';
import PropTypes from 'prop-types';

import Task from '../task/task';

class TaskList extends Component {
  static propTypes = {
    onDelete: PropTypes.func,
    onLabelDone: PropTypes.func,
    editClass: PropTypes.func,
    editLabel: PropTypes.func,
    taskli: PropTypes.array,
  };

  static defaultProps = {
    onDelete: () => {},
    onLabelDone: () => {},
    editClass: () => {},
    editLabel: () => {},
    taskli: [],
  };

  render() {
    const { taskli, onDelete, onLabelDone, editClass, editLabel } = this.props;
    const elements = taskli.map((el) => {
      return (
        <Task
          key={el.id}
          taskEL={el}
          onDelete={() => onDelete(el.id)}
          onLabelDone={() => onLabelDone(el.id)}
          editClass={() => editClass(el.id)}
          editLabel={editLabel}
        />
      );
    });

    return (
      <section className="main">
        <ul className="todo-list">{elements}</ul>
      </section>
    );
  }
}

//()

export default TaskList;
