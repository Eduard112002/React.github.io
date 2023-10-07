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
      id: label + maxId,
      edit: false,
      min: min,
      sec: sec,
      oldMin: min,
      oldSec: sec,
      idTimeEl: null,
      timer: true,
      pause: false,
    };
  };

  const deleted = (id) => {
    setStyleLi((state) => state.filter((el) => el.id !== id));
  };

  function toggleProperty(arr, id, propName) {
    const index = arr.findIndex((el) => el.id === id);
    if (index >= 0) {
      const oldItem = arr[index];
      const newItem = {
        ...oldItem,
        [propName]: !oldItem[propName],
      };
      return [...arr.slice(0, index), newItem, ...arr.slice(index + 1)];
    }
    return arr;
  }
  function conditionProperty(arr, id, propName) {
    const index = arr.findIndex((el) => el.id === id);
    const oldItem = arr.find((el) => el.id === id);
    const oldItemSelect = arr.filter((el) => el.id !== id);

    oldItemSelect.forEach((el) => {
      if (el[propName]) {
        el[propName] = false;
      }
    });

    const newItem = { ...oldItem, [propName]: !oldItem[propName] };

    return [...arr.slice(0, index), newItem, ...arr.slice(index + 1)];
  }

  const onLabelDone = (id) => {
    const newArrayDone = toggleProperty(styleLi, id, 'done');
    setStyleLi(newArrayDone);
  };

  const conditionTodo = (text, id) => {
    const newArr = conditionProperty(butEL, id, 'selected');
    setFilter(text);
    setButEl(newArr);
  };

  const clearCompleted = () => {
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
    console.log('tyt');
    setStyleLi((state) => {
      const index = state.findIndex((el) => el.id === id);
      console.log(index, 'index');
      const oldEl = state[index];
      console.log(oldEl, 'oldEl');
      const newEl = { ...oldEl, idTimeEl: idTime };
      console.log(newEl, 'newEl');
      console.log([...state.slice(0, index), newEl, ...state.slice(index + 1)], 'result');
      return [...state.slice(0, index), newEl, ...state.slice(index + 1)];
    });
  };
  const checkingTimer = (id, propName, boll) => {
    setStyleLi((state) => {
      const index = state.findIndex((el) => el.id === id);
      if (index >= 0) {
        const oldItem = state[index];
        oldItem[propName] = boll;
        return [...state.slice(0, index), oldItem, ...state.slice(index + 1)];
      }
      return state;
    });
  };
  const editClass = (id) => {
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
        checkingTimer={checkingTimer}
      />
      <Footer done={doneCount} conditionTodo={conditionTodo} butEL={butEL} clearCompleted={clearCompleted} />
    </section>
  );
};

const container = createRoot(document.getElementById('root'));

container.render(<TodoApp />);
