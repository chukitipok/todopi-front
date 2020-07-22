import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodoListService } from '../../services/todo-list.service';
import { TodoList } from '../../models/todo-list.model';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  todoListForm: FormGroup;
  itemForm: FormGroup;
  user: User;

  constructor(private fb: FormBuilder,
              private todoListService: TodoListService,
              private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(response => {
      if (response?.status === 'success') {
        this.user = response.user;
      }
    });

    this.todoListForm = this.fb.group({
      name: ['', [Validators.required]]
    });

    this.itemForm = this.fb.group({
      content: ['', Validators.required],
      amount: [1, [Validators.required, Validators.min(1), Validators.max(1000)]],
    });
  }

  userHasTodoList(): boolean {
    return this.user?.todoList !== null;
  }

  createTodoList(data: FormGroup): void {
    this.todoListService.createTodoList(data.value).subscribe(response => {
        if (response?.status === 'success') {
          this.user.todoList = response.result;
        }
      });
  }

  addItem(data: FormGroup): void {
    this.todoListService.addItem(data.value).subscribe(response => {
      if (response?.status === 'success') {
        this.user = response.result;
      }
    });
  }

}
