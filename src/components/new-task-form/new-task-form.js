import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './new-task-form.css';

class NewTaskForm extends Component {
  static propTypes = {
    addItem: PropTypes.func,
  };

  state = {
    label: '',
  };

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.label) {
      this.props.addItem(this.state.label);
    }
    this.setState({
      label: '',
    });
  };

  render() {
    return (
      <header className="header">
        <h1>Todos</h1>
        <form onSubmit={this.onSubmit}>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            autoFocus
            onChange={this.onLabelChange}
            value={this.state.label}
          ></input>
        </form>
      </header>
    );
  }
}

export default NewTaskForm;
