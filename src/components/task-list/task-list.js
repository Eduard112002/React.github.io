import React from 'react';
import './task-list.css';

import Task from '../task/task';

const TaskList = ({
  taskli,
  onDelete,
  onLabelDone,
  editClass,
  editLabel,
  timerStyleLi,
  addIdTimeEl,
  checkingTimer,
}) => {
  const elements = taskli.map((el) => {
    return (
      <Task
        key={el.id}
        taskEL={el}
        onDelete={() => onDelete(el.id)}
        onLabelDone={() => onLabelDone(el.id)}
        editClass={() => editClass(el.id)}
        editLabel={editLabel}
        timerStyleLi={timerStyleLi}
        addIdTimeEl={addIdTimeEl}
        checkingTimer={checkingTimer}
      />
    );
  });
  return (
    <section className="main">
      <ul className="todo-list">{elements}</ul>
    </section>
  );
};

export default TaskList;
