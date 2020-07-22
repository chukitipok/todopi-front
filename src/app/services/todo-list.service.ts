import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';
import {SessionService} from './session.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {
  url: string;
  id: string;

  constructor(private http: HttpClient, private sessionService: SessionService) {
    this.url = environment.api_url;
    this.id = this.sessionService.get('user_id');
  }

  createTodoList(data: string): Observable<any> {
    return this.http.post<boolean>(`${this.url}/user/${this.id}/create_todolist`, data);
  }

  addItem(data: any): Observable<any> {
    return this.http.post(`${this.url}/user/${this.id}/add_content`, data);
  }

}
