import React, { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';

const Task = ({ taskEL, onDelete, onLabelDone, editClass, editLabel, timerStyleLi, addIdTimeEl }) => {
  console.log(taskEL);
  const [minutes, setMin] = useState(Number(taskEL.min));
  const [seconds, setSec] = useState(Number(taskEL.sec));
  const [timer, setTimer] = useState(false);
  const taskTimer = () => {
    console.log(taskEL.idTimeEl, 'task');
    let min = minutes;
    let sec = seconds;
    let idInterval = null;
    if (taskEL.idTimeEl === null) {
      idInterval = setInterval(() => {
        console.log(idInterval);
        console.log(timer, 'task tytyt');
        if (!timer) {
          if (sec === 0 && min !== 0) {
            min = min - 1;
            sec = 60;
          } else if (min === 0 && sec === 1) {
            clearInterval(idInterval);
            addIdTimeEl(taskEL.id, null);
          }
          if (sec !== 0) {
            sec = sec - 1;
          }
          setMin(min);
          setSec(sec);
          setTimer(true);
          timerStyleLi(min, sec, taskEL.id);
          console.log(minutes, seconds, min, sec);
        }
      }, 1000);
      addIdTimeEl(taskEL.id, idInterval);
    }
  };
  const timerPause = () => {
    clearInterval(taskEL.idTimeEl);
    addIdTimeEl(taskEL.id, false);
    setTimer(null);
  };
  const timerPlay = () => {
    console.log(timer, minutes, seconds, 'tyt');
    if (minutes === 0 && seconds === 0) {
      setTimer(() => false);
      timerStyleLi(Number(taskEL.oldMin), Number(taskEL.oldSec), taskEL.id);
      setMin(Number(taskEL.oldMin));
      setSec(Number(taskEL.oldSec));
    } else if (timer === null) {
      clearInterval(taskEL.idTimeEl);
      addIdTimeEl(taskEL.id, null);
      taskTimer();
    }
  };
  useEffect(() => {
    console.log(minutes, seconds);
    if (Number(taskEL.oldMin) !== minutes || Number(taskEL.oldSec) !== seconds) {
      setTimer(null);
    }
  }, []);
  useEffect(() => {
    if (timer === false) {
      addIdTimeEl(taskEL.id, null);
      console.log(timer, taskEL);
      taskTimer();
    }
  }, [timer]);

  const onDeleteTimer = () => {
    clearInterval(taskEL.idTimeEl);
    onDelete();
  };

  const onLabelChange = (e) => {
    editLabel(taskEL.id, e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    editLabel(taskEL.id, taskEL.label);
    editClass(taskEL.id);
  };

  const newDate = formatDistanceToNow(taskEL.time, { includeSeconds: true });
  const validMin = taskEL.min < 10 ? `0${taskEL.min}` : taskEL.min;
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
