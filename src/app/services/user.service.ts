import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SessionService} from './session.service';
import {Observable} from 'rxjs';
import {User} from '../models/user.model';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url: string;

  constructor(private http: HttpClient, private sessionService: SessionService) {
    this.url = environment.api_url;
  }

  getCurrentUser(): Observable<any>{
    return this.http.get<User>(`${this.url}/user/${this.sessionService.get('user_id')}`);
  }
}
