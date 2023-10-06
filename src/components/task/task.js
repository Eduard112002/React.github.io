import React, { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';

const Task = ({ taskEL, onDelete, onLabelDone, editClass, editLabel, timerStyleLi, addIdTimeEl }) => {
  const [timer, setTimer] = useState(false);
  const [minutes, setMin] = useState(Number(taskEL.min));
  const [seconds, setSec] = useState(Number(taskEL.sec));
  const taskTimer = () => {
    console.log(1);
    let min = minutes;
    let sec = seconds;
    let idInterval = setInterval(() => {
      console.log(2);
      if (!timer) {
        if (sec === 0 && min !== 0) {
          min = min - 1;
          sec = 60;
        } else if (min === 0 && sec === 0) {
          clearInterval(idInterval);
        }
        if (sec !== 0) {
          sec = sec - 1;
        }
        setTimer(true);
        setMin(min);
        setSec(sec);
        timerStyleLi(min, sec, taskEL.id);
      }
    }, 1000);
    addIdTimeEl(taskEL.id, idInterval);
  };
  const timerPause = () => {
    console.log(3);
    clearInterval(taskEL.idTimeEl);
    setTimer(false);
  };
  const timerPlay = () => {
    console.log(4);
    if (minutes === 0 && seconds === 0) {
      setTimer(null);
      setMin(Number(taskEL.oldMin));
      setSec(Number(taskEL.oldSec));
    } else if (timer === false) {
      clearInterval(taskEL.idTimeEl);
      taskTimer();
    }
  };

  useEffect(() => {
    console.log('use new');
    taskTimer();
  }, []);

  useEffect(() => {
    if (timer === null) {
      console.log('use stop');
      clearInterval(taskEL.idTimeEl);
      taskTimer();
    }
  }, [timer]);

  const onDeleteTimer = () => {
    console.log(taskEL.idTimeEl, 'id');
    clearInterval(taskEL.idTimeEl);
    onDelete();
  };

  const onLabelChange = (e) => {
    console.log(5);
    this.setState({
      label: e.target.value,
    });
  };

  const onSubmit = (e) => {
    console.log(6);
    e.preventDefault();
    editLabel(taskEL.id, taskEL.label);
    editClass(taskEL.id);
  };

  const newDate = formatDistanceToNow(taskEL.time, { includeSeconds: true });
  const validMin = minutes < 10 ? `0${minutes}` : minutes;
  const validSec = seconds < 10 ? `0${seconds}` : seconds;
  let classNAme = 'label';
  if (taskEL.done) {
    classNAme += ' done';
  }
  let classNameInput = '';
  if (taskEL.edit) {
    classNameInput += ' editing';
  }
  return (
    <li key={taskEL.id} className={classNameInput}>
      <div className="view">
        <input id={taskEL.id} className="toggle" type="checkbox" defaultChecked={taskEL.done} onClick={onLabelDone} />
        <label htmlFor={taskEL.id}>
          <span className={classNAme}>{taskEL.label}</span>
          <span className="description">
            <button className="icon icon-play" onClick={timerPlay}></button>
            <button className="icon icon-pause" onClick={timerPause}></button>
            <span>
              {validMin}:{validSec}
            </span>
          </span>
          <span className="created description">created {newDate} ago</span>
        </label>
        <button className="icon icon-edit" onClick={editClass}></button>
        <button className="icon icon-destroy" onClick={onDeleteTimer}></button>
      </div>
      <form onSubmit={onSubmit}>
        <input type="text" className="edit" onChange={onLabelChange} value={taskEL.label} autoFocus />
      </form>
    </li>
  );
};

export default Task;
