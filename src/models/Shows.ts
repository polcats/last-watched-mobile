import { model, Model, modelAction, prop_mapObject } from 'mobx-keystone';
import { observable } from 'mobx';
import Show from './Show';

@model('lastwatched/Shows')
class Shows extends Model({
  items: prop_mapObject<Map<string, Show>>(),
}) {
  targetItem: string = '';

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
  };

  @modelAction
  deleteTargetItem = () => {
    this.items.delete(this.targetItem);
    this.setTargetItem('');
  };
}

export default Shows;
