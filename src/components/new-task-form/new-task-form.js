import React, { useState } from 'react';
import './new-task-form.css';

const NewTaskForm = ({ addItem }) => {
  const [label, setLabel] = useState('');
  const [min, setMin] = useState('');
  const [sec, setSec] = useState('');

  const onLabelChange = (e) => {
    setLabel(e.target.value);
  };

  const onMinChange = (e) => {
    setMin(e.target.value);
  };

  const onSecChange = (e) => {
    setSec(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (label) {
      addItem(label, min, sec);
    }
    setLabel('');
    setMin('');
    setSec('');
  };

  return (
    <header className="header">
      <h1>Todos</h1>
      <form onSubmit={onSubmit} className="new-todo-form">
        <button type="submit" />
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          onChange={onLabelChange}
          value={label}
        />
        <input
          onChange={onMinChange}
          value={min}
          className="new-todo-form__timer"
          placeholder="Min"
          type="number"
          max="99"
        />
        <input
          onChange={onSecChange}
          value={sec}
          className="new-todo-form__timer"
          placeholder="Sec"
          type="number"
          max="59"
        />
      </form>
    </header>
  );
};

export default NewTaskForm;
