import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TasksFilter from '../tasks-filter/tasks-filter';
import './footer.css';

class Footer extends Component {
  render() {
    const { done, conditionTodo, clearCompleted, butEL } = this.props;
    const elements = butEL.map((el) => {
      return (
        <li key={el.id}>
          <TasksFilter butEl={el} conditionTodo={() => conditionTodo(el.text, el.id)} />
        </li>
      );
    });
    return (
      <footer className="footer">
        <span className="todo-count"> {done} items left</span>
        <ul className="filters">{elements}</ul>
        <button onClick={clearCompleted} className="clear-completed">
          Clear completed
        </button>
      </footer>
    );
  }
}
Footer.defaultProps = {
  conditionTodo: () => {},
  clearCompleted: () => {},
  butEL: [],
};

Footer.propTypes = {
  done: PropTypes.number,
  conditionTodo: PropTypes.func,
  clearCompleted: PropTypes.func,
  butEL: PropTypes.array,
};

export default Footer;
