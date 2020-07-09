import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  register(value: any, key: string) {
    localStorage.setItem(key, btoa(JSON.stringify(value)));
  }

  get(key: string): any {
    return atob(localStorage.getItem(key));
  }
}
