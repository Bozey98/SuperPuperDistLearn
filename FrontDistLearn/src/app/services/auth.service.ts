import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/models';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {

  loggedInStatus = false;
  currentUser: User;

  constructor(private http: HttpClient) { }

  setUserInfo() : Observable<User> {
    return this.http.get("http://localhost:5000/api/Auth/GetInfo")
    .pipe(
      map((data : User) =>  {
        this.currentUser = data;
        return  data
      })
    )
  }

  setLoggedIn(value:boolean) {
    this.loggedInStatus = value;
  }

  get isLoggedIn() {
    return this.loggedInStatus;
  }

  get userInfo() {
    return this.currentUser;
  }
}
