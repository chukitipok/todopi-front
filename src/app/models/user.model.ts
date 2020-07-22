import { TodoList } from './todo-list.model';

export interface User {
  firstName: string;
  lastName: string;
  birthday: string;
  email: string;
  password: string;
  todoList: TodoList | null;
}
