import { TodoList } from './todo-list.model';

export interface User {
  first_name: string;
  last_name: string;
  birthdate: string;
  email: string;
  password: string;
  todolist: TodoList | null;
}
