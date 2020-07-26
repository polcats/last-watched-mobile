import { createContext } from 'react';
import { model, Model, prop, registerRootStore } from 'mobx-keystone';
import Shows from './Shows';

@model('lastwatched/App')
class App extends Model({
  shows: prop<Shows>(),
}) {}

const createStore = (): App => {
  const store = new App({
    shows: new Shows({
      items: new Map(),
    }),
  });

  registerRootStore(store);
  return store;
};

const appContext = createContext(createStore());
export default appContext;
