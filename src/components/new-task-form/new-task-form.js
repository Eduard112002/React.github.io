import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './new-task-form.css';

class NewTaskForm extends Component {
  static propTypes = {
    addItem: PropTypes.func,
  };

  state = {
    label: '',
    min: '',
    sec: '',
  };

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onMinChange = (e) => {
    this.setState({
      min: e.target.value,
    });
  };

  onSecChange = (e) => {
    this.setState({
      sec: e.target.value,
    });
  };

  onSubmit = (e) => {
    const { label, min, sec } = this.state;
    e.preventDefault();
    if (this.state.label) {
      this.props.addItem(label, min, sec);
    }
    this.setState({
      label: '',
      min: '',
      sec: '',
    });
  };

  render() {
    const { label, min, sec } = this.state;
    return (
      <header className="header">
        <h1>Todos</h1>
        <form onSubmit={this.onSubmit} className="new-todo-form">
          <button type="submit" />
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            autoFocus
            onChange={this.onLabelChange}
            value={label}
          />
          <input
            onChange={this.onMinChange}
            value={min}
            className="new-todo-form__timer"
            placeholder="Min"
            type="number"
            max="99"
          />
          <input
            onChange={this.onSecChange}
            value={sec}
            className="new-todo-form__timer"
            placeholder="Sec"
            type="number"
            max="59"
          />
        </form>
      </header>
    );
  }
}

export default NewTaskForm;
