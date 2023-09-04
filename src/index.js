import React, { Component } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';

import NewTaskForm from './components/new-task-form';
import TaskList from './components/task-list/task-list';
import Footer from './components/footer/footer';

class TodoApp extends Component {
  maxId = 100;

  state = {
    styleLi: [],
    filter: 'All',
    butEL: [
      { text: 'All', selected: false, id: 'Al' },
      { text: 'Active', selected: false, id: 'Ac' },
      { text: 'Completed', selected: false, id: 'Com' },
    ],
  };

  createItem = (label) => {
    return {
      label: label,
      time: new Date(),
      done: false,
      id: (this.maxId += 1),
      edit: false,
    };
  };

  deleted = (id) => {
    this.setState(({ styleLi }) => {
      const index = styleLi.findIndex((el) => el.id === id);

      const newAll = [...styleLi.slice(0, index), ...styleLi.slice(index + 1)];

      return {
        styleLi: newAll,
      };
    });
  };

  toggleProperty(arr, id, propName) {
    const index = arr.findIndex((el) => el.id === id);
    const oldItem = arr[index];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };

    return [...arr.slice(0, index), newItem, ...arr.slice(index + 1)];
  }

  conditionProperty(arr, id, propName) {
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

  onLabelDone = (id) => {
    this.setState(({ styleLi }) => {
      const newArray = this.toggleProperty(styleLi, id, 'done');

      return {
        styleLi: newArray,
      };
    });
  };

  conditionTodo = (text, id) => {
    const newArr = this.conditionProperty(this.state.butEL, id, 'selected');

    this.setState(() => {
      return {
        filter: text,
        butEL: newArr,
      };
    });
  };

  clearCompleted = () => {
    const newMAs = this.state.styleLi.filter((el) => !el.done);
    this.setState(() => {
      return {
        styleLi: newMAs,
      };
    });
  };

  filterTodoList = (item) => {
    switch (this.state.filter) {
      case 'All':
        return item;

      case 'Active':
        return item.filter((el) => !el.done);

      case 'Completed':
        return item.filter((el) => el.done);
    }
  };

  addItem = (text) => {
    const newItem = this.createItem(text);
    this.setState(({ styleLi }) => {
      const newArr = [...styleLi, newItem];

      return {
        styleLi: newArr,
      };
    });
  };

  editLabel = (id, label) => {
    this.setState(({ styleLi }) => {
      const index = styleLi.findIndex((el) => el.id === id);
      const oldArray = styleLi[index];
      const newItem = { ...oldArray, label: label };
      return {
        styleLi: [...styleLi.slice(0, index), newItem, ...styleLi.slice(index + 1)],
      };
    });
  };

  editClass = (id) => {
    this.setState(({ styleLi }) => {
      const newArray = this.toggleProperty(styleLi, id, 'edit');

      return {
        styleLi: newArray,
      };
    });
  };
  render() {
    const { styleLi, butEL } = this.state;
    const doneCount = styleLi.filter((el) => !el.done).length;
    return (
      <section className="todoapp">
        <NewTaskForm addItem={this.addItem} />
        <TaskList
          taskli={this.filterTodoList(styleLi)}
          onDelete={this.deleted}
          onLabelDone={this.onLabelDone}
          editClass={this.editClass}
          editLabel={this.editLabel}
        />
        <Footer
          done={doneCount}
          conditionTodo={this.conditionTodo}
          butEL={butEL}
          clearCompleted={this.clearCompleted}
        />
      </section>
    );
  }
}

const container = createRoot(document.getElementById('root'));

container.render(<TodoApp />);
