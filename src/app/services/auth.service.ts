import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  logged = false;

  constructor(private httpClient: HttpClient) { }

  login(credentials): Observable<any> {
    return this.httpClient.post(`${environment.api_url}/user/login`, credentials);
  }

  register(registerInfo): Observable<any> {
    return this.httpClient.post(`${environment.api_url}/user/create`, {
      first_name: registerInfo.firstname,
      last_name: registerInfo.lastname,
      birthdate: registerInfo.birthdate,
      email: registerInfo.email,
      password: registerInfo.password,
    });
  }

  isLogged(): boolean {
    return this.logged;
  }


}
