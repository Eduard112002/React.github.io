import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';

import NewTaskForm from './components/new-task-form';
import TaskList from './components/task-list/task-list';
import Footer from './components/footer/footer';

const TodoApp = () => {
  const [styleLi, setStyleLi] = useState([]);
  const [filter, setFilter] = useState('All');
  const [maxId, setMaxId] = useState(10);
  const tabs = [
    { text: 'All', selected: false, id: 'Al' },
    { text: 'Active', selected: false, id: 'Ac' },
    { text: 'Completed', selected: false, id: 'Com' },
  ];
  const [butEL, setButEl] = useState(tabs);
  const createItem = (label, min, sec) => {
    setMaxId((s) => s + 1);
    return {
      label: label,
      time: new Date(),
      done: false,
      id: maxId,
      edit: false,
      min: min,
      sec: sec,
      oldMin: min,
      oldSec: sec,
      idTimeEl: null,
    };
  };

  const deleted = (id) => {
    console.log(styleLi, 'delete start');
    setStyleLi(styleLi.filter((el) => el.id !== id));
  };

  function toggleProperty(arr, id, propName) {
    console.log(10);
    const index = arr.findIndex((el) => el.id === id);
    const oldItem = arr[index];
    const newItem = {
      ...oldItem,
      [propName]: !oldItem[propName],
    };
    return [...arr.slice(0, index), newItem, ...arr.slice(index + 1)];
  }
  function conditionProperty(arr, id, propName) {
    console.log(11);
    const index = arr.findIndex((el) => el.id === id);
    const oldItem = arr.find((el) => el.id === id);
    const oldItemSelect = arr.filter((el) => el.id !== id);

    oldItemSelect.forEach((el) => {
      if (el.selected) {
        el.selected = false;
      }
    });

    const newItem = { ...oldItem, [propName]: !oldItem[propName] };

    return [...arr.slice(0, index), newItem, ...arr.slice(index + 1)];
  }

  const onLabelDone = (id) => {
    console.log(12);
    const newArrayDone = toggleProperty(styleLi, id, 'done');
    const newArra = toggleProperty(newArrayDone, id, 'timeDone');
    setStyleLi(newArra);
  };

  const conditionTodo = (text, id) => {
    console.log(13);
    const newArr = conditionProperty(butEL, id, 'selected');
    setFilter(text);
    setButEl(newArr);
  };

  const clearCompleted = () => {
    console.log(15);
    const newMAs = styleLi.filter((el) => !el.done);
    setStyleLi(newMAs);
  };

  const filterTodoList = (item) => {
    switch (filter) {
      case 'All':
        return item;

      case 'Active':
        return item.filter((el) => !el.done);

      case 'Completed':
        return item.filter((el) => el.done);
    }
  };

  const addItem = (text, min, sec) => {
    console.log(17);
    const newItem = createItem(text, min, sec);
    setStyleLi((s) => [...s, newItem]);
  };
  const timerStyleLi = (min, sec, id) => {
    const index = styleLi.findIndex((el) => el.id === id);
    const newItemStyleLi = styleLi[index];
    const arr = [...styleLi];
    arr[index] = {
      ...newItemStyleLi,
      min: min,
      sec: sec,
    };
    setStyleLi(arr);
  };
  const editLabel = (id, label) => {
    console.log(19);
    const index = styleLi.findIndex((el) => el.id === id);
    const oldArray = styleLi[index];
    const newItem = { ...oldArray, label: label };
    setStyleLi((s) => [...s.slice(0, index), newItem, ...s.slice(index + 1)]);
  };
  const addIdTimeEl = (id, idTime) => {
    console.log(idTime, 'addIdtimer');
    const index = styleLi.findIndex((el) => el.id === id);
    const oldEl = styleLi.find((el) => el.id === id);
    const newEl = { ...oldEl, idTimeEl: idTime };
    setStyleLi((s) => [...s.slice(0, index), newEl, ...s.slice(index + 1)]);
  };
  const editClass = (id) => {
    console.log(20);
    const newArray = toggleProperty(styleLi, id, 'edit');
    setStyleLi(newArray);
  };
  const doneCount = styleLi.filter((el) => !el.done).length;
  console.log(styleLi);
  return (
    <section className="todoapp">
      <NewTaskForm addItem={addItem} />
      <TaskList
        taskli={filterTodoList(styleLi)}
        timerStyleLi={timerStyleLi}
        onDelete={deleted}
        onLabelDone={onLabelDone}
        editClass={editClass}
        editLabel={editLabel}
        addIdTimeEl={addIdTimeEl}
      />
      <Footer done={doneCount} conditionTodo={conditionTodo} butEL={butEL} clearCompleted={clearCompleted} />
    </section>
  );
};

const container = createRoot(document.getElementById('root'));

container.render(<TodoApp />);
