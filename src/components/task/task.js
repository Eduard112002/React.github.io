import React, { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';

const Task = ({ taskEL, onDelete, onLabelDone, editClass, editLabel, timerStyleLi, addIdTimeEl, checkingTimer }) => {
  const [minutes, setMin] = useState(Number(taskEL.min));
  const [seconds, setSec] = useState(Number(taskEL.sec));
  const [timer, setTimer] = useState(taskEL.timer);
  const [pause, setPause] = useState(taskEL.pause);
  const [replay, setReplay] = useState(false);
  const taskTimer = () => {
    let min = minutes;
    let sec = seconds;
    let idInterval = null;
    idInterval = setInterval(() => {
      if (min !== 0 && sec === 0) {
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
      timerStyleLi(min, sec, taskEL.id);
    }, 1000);
    addIdTimeEl(taskEL.id, idInterval);
  };
  const timerPlay = () => {
    if (Number(taskEL.min) === 0 && Number(taskEL.sec) === 0) {
      timerStyleLi(Number(taskEL.oldMin), Number(taskEL.oldSec), taskEL.id);
      setMin(Number(taskEL.oldMin));
      setSec(Number(taskEL.oldSec));
      setReplay(true);
    }
    if (pause) {
      taskTimer();
    }
  };
  function timerPause() {
    setPause(true);
    checkingTimer(taskEL.id, 'pause', true);
    setTimer(false);
    checkingTimer(taskEL.id, 'timer', false);
    clearInterval(taskEL.idTimeEl);
    addIdTimeEl(taskEL.id, null);
  }
  useEffect(() => {
    if (replay) {
      setReplay(false);
      taskTimer();
    }
  }, [replay]);
  useEffect(() => {
    if (timer) {
      checkingTimer(taskEL.id, 'timer', false);
      setTimer(false);
      taskTimer();
    }
  }, [timer]);
  useEffect(() => {
    return () => {
      setTimer(false);
      checkingTimer(taskEL.id, 'timer', false);
    };
  }, []);
  const onDeleteTimer = () => {
    clearInterval(taskEL.idTimeEl);
    addIdTimeEl(taskEL.id, null);
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
  const validSec = taskEL.sec < 10 ? `0${taskEL.sec}` : taskEL.sec;
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
