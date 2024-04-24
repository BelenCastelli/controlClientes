import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url:string = ''
  constructor(private http: HttpClient) { 
    this.url = 'http://localhost:3000/login'
  }

  login(user:User){
      return this.http.post(this.url, user)
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
