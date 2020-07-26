import { createContext } from 'react';
import {
  model,
  Model,
  prop,
  registerRootStore,
  modelAction,
} from 'mobx-keystone';
import Shows from './Shows';
import { observable } from 'mobx';
import Show from './Show';

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

  store.shows.createItem(
    new Show({ isNew: false, name: 'Lorem', lastEpisode: 3 }),
  );
  store.shows.createItem(
    new Show({ isNew: false, name: 'Ipsum', lastEpisode: 12 }),
  );
  store.shows.createItem(
    new Show({ isNew: false, name: 'Battle Geese', lastEpisode: 43 }),
  );
  store.shows.createItem(
    new Show({
      isNew: false,
      name: 'Battle GeeseBattle GeeseBattle Geese ',
      lastEpisode: 43,
    }),
  );
  store.shows.createItem(
    new Show({
      isNew: false,
      name: 'Battle Geese Lorem Lorem Lorem Lorem Lorem',
      lastEpisode: 43,
    }),
  );

  registerRootStore(store);
  return store;
};

const appContext = createContext(createStore());
export default appContext;
