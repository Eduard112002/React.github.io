import React, { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';

class Task extends Component {
  state = {
    done: false,
    label: this.props.taskEL.label,
  };

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.editLabel(this.props.taskEL.id, this.state.label);
    this.props.editClass(this.props.taskEL.id);
  };

  render() {
    const { time, id, done, edit } = this.props.taskEL;
    const newDate = formatDistanceToNow(time, { includeSeconds: true });
    const label = this.state.label;

    const { onLabelDone, onDelete, editClass } = this.props;

    let classNAme = 'description';
    if (done) {
      classNAme += ' done';
    }

    let classNameInput = '';
    if (edit) {
      classNameInput += ' editing';
    }

    return (
      <li key={id} className={classNameInput}>
        <div className="view">
          <input id={id} className="toggle" type="checkbox" defaultChecked={done} onClick={onLabelDone}></input>
          <label htmlFor={id}>
            <span className={classNAme}>{label}</span>
            <span className="created">created {newDate} ago</span>
          </label>
          <button className="icon icon-edit" onClick={editClass}></button>
          <button className="icon icon-destroy" onClick={onDelete}></button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input type="text" className="edit" onChange={this.onLabelChange} value={label} autoFocus></input>
        </form>
      </li>
    );
  }
}

export default Task;
