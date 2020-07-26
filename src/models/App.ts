import { createContext } from 'react';
import {
  model,
  Model,
  prop,
  registerRootStore,
  modelAction,
} from 'mobx-keystone';
import { observable } from 'mobx';
import Shows from './Shows';

@model('lastwatched/App')
class App extends Model({
  shows: prop<Shows>(),
}) {
  @observable mode: string = 'create';
  @observable dontSave: boolean = true;
  @observable errors = {
    name: false,
    episode: false,
  };

  @modelAction
  setError = (name: boolean, episode: boolean) => {
    this.errors.name = name;
    this.errors.episode = episode;
  };

  @modelAction
  setMode(mode: string) {
    this.mode = mode;
  }

  @modelAction
  setDontSave(dontSave: boolean) {
    this.dontSave = dontSave;
  }
}

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
