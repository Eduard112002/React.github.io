import React, { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';

class Task extends Component {
  state = {
    done: false,
    label: this.props.taskEL.label,
    oldMin: Number(this.props.taskEL.min),
    oldSec: Number(this.props.taskEL.sec),
    min: Number(this.props.taskEL.min),
    sec: Number(this.props.taskEL.sec),
  };
  id = null;

  timerPause = () => {
    clearInterval(this.id);
  };

  timerPlay = () => {
    const { min, sec } = this.state;
    if (min === 0 && sec === 0) {
      this.setState(({ oldMin, oldSec }) => {
        this.taskTimer();
        return {
          min: oldMin,
          sec: oldSec,
        };
      });
    } else {
      this.taskTimer();
    }
  };

  taskTimer = () => {
    this.id = setInterval(() => {
      this.setState(({ min, sec }) => {
        let newMin;
        let newSec;
        if (sec === 0 && min !== 0) {
          newSec = 59;
          newMin = min - 1;
        } else if (min === 0 && sec === 0) {
          clearInterval(this.id);
          return {
            min: 0,
            sec: 0,
          };
        }
        if (sec !== 0) {
          newSec = sec - 1;
          newMin = min;
        }
        return {
          min: newMin,
          sec: newSec,
        };
      });
    }, 1000);
  };

  componentDidMount() {
    this.taskTimer();
  }

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
    const { min, sec } = this.state;
    const newDate = formatDistanceToNow(time, { includeSeconds: true });
    const validMin = min < 10 ? `0${min}` : min;
    const validSec = sec < 10 ? `0${sec}` : sec;
    const label = this.state.label;
    const { onLabelDone, onDelete, editClass } = this.props;
    let classNAme = 'label';
    if (done) {
      classNAme += ' done';
      this.timerPause();
    }

    let classNameInput = '';
    if (edit) {
      classNameInput += ' editing';
    }

    return (
      <li key={id} className={classNameInput}>
        <div className="view">
          <input id={id} className="toggle" type="checkbox" defaultChecked={done} onClick={onLabelDone} />
          <label htmlFor={id}>
            <span className={classNAme}>{label}</span>
            <span className="description">
              <button className="icon icon-play" onClick={this.timerPlay}></button>
              <button className="icon icon-pause" onClick={this.timerPause}></button>
              <span>
                {validMin}:{validSec}
              </span>
            </span>
            <span className="created description">created {newDate} ago</span>
          </label>
          <button className="icon icon-edit" onClick={editClass}></button>
          <button className="icon icon-destroy" onClick={onDelete}></button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input type="text" className="edit" onChange={this.onLabelChange} value={label} autoFocus />
        </form>
      </li>
    );
  }
}

export default Task;
