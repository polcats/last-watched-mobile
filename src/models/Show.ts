import { model, Model, modelAction, prop } from 'mobx-keystone';
import { computed } from 'mobx';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

enum Status {
  ongoing = 'ongoing',
  onhold = 'onhold',
  done = 'done',
}

@model('lastwatched/Show')
class Show extends Model({
  id: prop<string>(() => uuidv4()),
  date: prop<string>(() => moment().format()),
  name: prop<string>(''),
  lastEpisode: prop<number>(0),
  status: prop<Status>(Status.ongoing),
  isNew: prop<boolean>(true),
}) {
  // Since I can't overlord the assignment operator..
  @modelAction
  setSelfFrom = (other: Show) => {
    this.date = other.date;
    this.name = other.name;
    this.lastEpisode = other.lastEpisode;
    this.status = other.status;
  };

  @modelAction
  setDate = (date: string) => {
    this.date = date;
  };

  @modelAction
  setName = (name: string) => {
    this.name = name;
  };

  @modelAction
  incrementEpisode = () => {
    ++this.lastEpisode;
  };

  @modelAction
  decrementEpisode = () => {
    --this.lastEpisode;
  };

  @modelAction
  setStatus = (status: Status) => {
    this.status = status;
  };

  @computed
  get isValidName() {
    return this.name.trim().length !== 0;
  }
}

export default Show;
