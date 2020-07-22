import { Item } from './item.model';

export interface TodoList {
  name: string;
  todos: Item[];
}
