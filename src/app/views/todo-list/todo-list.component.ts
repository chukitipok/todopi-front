import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TodoListService} from '../../services/todo-list.service';
import {TodoList} from '../../models/todo-list.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  todoListForm: FormGroup;
  hasTodoList = false;

  myTodoList: TodoList;

  constructor(private fb: FormBuilder, private todoListService: TodoListService) { }

  ngOnInit(): void {
    if (this.hasTodoList)
    this.todoListForm = this.fb.group({
      name: ['', [Validators.required]]
    });
  }

  createTodoList(data: FormGroup): void {
    this.todoListService.createTodoList(data.value)
      .subscribe(response => {
        console.log(response);
        if (response?.status === 'success') {
          console.log(response);
          this.hasTodoList = true;
          this.myTodoList = response.resultat;
        }
      });
  }

}
