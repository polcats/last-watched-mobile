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
  updateDate = () => {
    this.date = moment().format();
  };

  @modelAction
  setOld = () => {
    this.isNew = false;
  };

  @modelAction
  setName = (name: string) => {
    this.name = name;
  };

  @modelAction
  incrementEpisode = () => {
    this.updateDate();
    ++this.lastEpisode;
  };

  @modelAction
  decrementEpisode = () => {
    if (this.lastEpisode === 0) {
      return;
    }

    this.updateDate();
    --this.lastEpisode;
  };

  @modelAction
  setEpisode = (episode: number) => {
    this.lastEpisode = episode;
  };

  @modelAction
  setStatus = (status: Status) => {
    this.status = status;
  };

  @computed
  get isValidName() {
    return this.name.trim().length !== 0;
  }

  @computed
  get isValidEpisode() {
    return this.lastEpisode >= 0;
  }

  @computed
  get isValid() {
    return this.isValidName && this.isValidEpisode;
  }
}

export type { Status };
export default Show;
