import React from 'react';
import ReactDOM from 'react-dom';
import './assets/style/index.css';
import App from './pages/App';
import 'antd/dist/antd.css';

import { ToDoList } from './models/ToDoList';
import { getSnapshot, onSnapshot } from 'mobx-state-tree';

const localStorageKey = 'todolist';

let initialState = { items: [] };

if (localStorage.getItem(localStorageKey)) {
  const json = JSON.parse(localStorage.getItem(localStorageKey));
  if (ToDoList.is(json)) {
    initialState = json;
  }
}

let toDoList = (window.toDoList = ToDoList.create(initialState));

onSnapshot(toDoList, snapshot => {
  try {
    localStorage.setItem(localStorageKey, JSON.stringify(snapshot));
  } catch (e) {
    console.log("Error: " + e);
  }
})

function renderApp() {
  ReactDOM.render(
      <App toDoList={toDoList} />,
    document.getElementById('root')
  );
}
renderApp();

if(module.hot) {
  module.hot.accept(["./pages/App"], () => {
    renderApp();
  })

  module.hot.accept(["./models/ToDoList"], () => {
    const snapshot = getSnapshot(toDoList);
    toDoList = (window.group = ToDoList.create(snapshot));
    renderApp();
  })
}

