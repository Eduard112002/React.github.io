import React from 'react';

import TasksFilter from '../tasks-filter/tasks-filter';
import './footer.css';

const Footer = ({ done, conditionTodo, clearCompleted, butEL }) => {
  const elements = butEL.map((el) => {
    return (
      <li key={el.id}>
        <TasksFilter butEl={el} conditionTodo={() => conditionTodo(el.text, el.id)} />
      </li>
    );
  });
  return (
    <footer className="footer">
      <div className="todo-count">{done} items left</div>
      <ul className="filters">{elements}</ul>
      <button onClick={clearCompleted} className="clear-completed">
        Clear completed
      </button>
    </footer>
  );
};

export default Footer;
