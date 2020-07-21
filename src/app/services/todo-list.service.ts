import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';
import {SessionService} from './session.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  createTodoList(data: string): Observable<any> {
    return this.http.post<boolean>(`${environment.api_url}/user/${this.sessionService.get('user_id')}/create_todolist`, data);
  }

}
