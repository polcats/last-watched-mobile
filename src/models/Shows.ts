import { model, Model, modelAction, prop_mapObject } from 'mobx-keystone';
import { AsyncStorage } from 'react-native';
import Show from './Show';

@model('lastwatched/Shows')
class Shows extends Model({
  items: prop_mapObject<Map<string, Show>>(),
}) {
  targetItem: string = '';

  @modelAction
  addItem = (item: any) => {
    this.items.set(
      item.id,
      new Show({
        id: item.id,
        name: item.name,
        date: item.date,
        lastEpisode: item.lastEpisode,
        status: item.status,
        isNew: false,
      }),
    );
  };

  @modelAction
  save = async () => {
    try {
      const jsonValue = JSON.stringify(Array.from(this.items));
      await AsyncStorage.setItem('lastWatchedData', jsonValue);
    } catch (error) {}
  };

  @modelAction
  getTargetItem = () => {
    return this.items.get(this.targetItem);
  };

  @modelAction
  setTargetItem = (id: string) => {
    this.targetItem = id;
  };

  @modelAction
  clearTargetItem = (id: string) => {
    this.setTargetItem('');
  };

  @modelAction
  createItem = (toAdd?: Show) => {
    const item = toAdd ? toAdd : new Show({});
    this.items.set(item.id, item);
    this.targetItem = item.id;
  };

  @modelAction
  resetTargetItem = (other: Show) => {
    this.items.get(this.targetItem)?.setSelfFrom(other);
  };

  @modelAction
  deleteItem = (id: string) => {
    this.items.delete(id);
    this.save();
  };

  @modelAction
  deleteTargetItem = () => {
    this.items.delete(this.targetItem);
    this.setTargetItem('');
    this.save();
  };
}

export default Shows;
