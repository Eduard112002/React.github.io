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
    setStyleLi(styleLi.filter((el) => el.id !== id));
  };

  function toggleProperty(arr, id, propName) {
    const index = arr.findIndex((el) => el.id === id);
    const oldItem = arr[index];
    const newItem = {
      ...oldItem,
      [propName]: !oldItem[propName],
    };
    return [...arr.slice(0, index), newItem, ...arr.slice(index + 1)];
  }
  function conditionProperty(arr, id, propName) {
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
    const newArrayDone = toggleProperty(styleLi, id, 'done');
    const newArra = toggleProperty(newArrayDone, id, 'timeDone');
    setStyleLi(newArra);
  };

  const conditionTodo = (text, id) => {
    const newArr = conditionProperty(butEL, id, 'selected');
    setFilter(text);
    setButEl(newArr);
  };

  const clearCompleted = () => {
    console.log(15);
    setStyleLi((newMAs) =>
      newMAs.filter((el) => {
        if (!el.done) {
          return true;
        } else {
          clearInterval(el.idTimeEl);
          return false;
        }
      })
    );
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
    const newItem = createItem(text, min, sec);
    setStyleLi((s) => [...s, newItem]);
  };
  const timerStyleLi = (min, sec, id) => {
    console.log('tyt');
    setStyleLi((state) => {
      const index = state.findIndex((el) => el.id === id);
      const newItemStyleLi = state[index];
      const arr = [...state];
      arr[index] = {
        ...newItemStyleLi,
        min: min,
        sec: sec,
      };
      return arr;
    });
  };
  const editLabel = (id, label) => {
    const index = styleLi.findIndex((el) => el.id === id);
    const oldArray = styleLi[index];
    const newItem = { ...oldArray, label: label };
    setStyleLi((s) => [...s.slice(0, index), newItem, ...s.slice(index + 1)]);
  };
  const addIdTimeEl = (id, idTime) => {
    setStyleLi((s) => {
      const index = styleLi.findIndex((el) => el.id === id);
      const oldEl = styleLi[index];
      const newEl = { ...oldEl, idTimeEl: idTime };
      return [...s.slice(0, index), newEl, ...s.slice(index + 1)];
    });
  };
  const editClass = (id) => {
    const newArray = toggleProperty(styleLi, id, 'edit');
    setStyleLi(newArray);
  };
  const doneCount = styleLi.filter((el) => !el.done).length;
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
