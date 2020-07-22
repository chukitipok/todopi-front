import { TodoList } from './todo-list.model';

export interface User {
  firstName: string;
  lastName: string;
  birthdate: string;
  email: string;
  password: string;
  todolist: TodoList | null;
}
