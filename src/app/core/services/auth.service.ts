import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';
import { User } from '../models/user.model';
import { LoginPayload } from '../models/auth.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService{

  users: User[] = [];

  private http = inject(HttpClient);
  private api = 'http://localhost:3000/users';
  private currentUserSubject = new BehaviorSubject<User |null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    const user = localStorage.getItem('loggedInUser');
    if(user){
      this.currentUserSubject.next(JSON.parse(user));
    }
   }

  newUsers(user: Omit<User, 'id'>){
    return this.http.post<User>(`${this.api}/users`, user);
  }

  loggedIn(user: LoginPayload){
    return this.http.get<User[]>(this.api, {
      params: {
        email : user.email,
        password : user.password,
    }
    }).pipe(
      tap(
        users => {
          if (users.length) {
            localStorage.setItem('loggedInUser', JSON.stringify(users[0]));
            this.currentUserSubject.next(users[0]);
          }
        })
    )
  }

  logoutUser() {
    localStorage.removeItem('loggedInUser');
    this.currentUserSubject.next(null);
  }
  updateUser(user : User){
    return this.http.patch<User>(
      `http://localhost:3000/users/${user.id}`,
      { name: user.name }
    ).pipe(
      tap(updated => {
        localStorage.setItem('loggedInUser', JSON.stringify(updated));
        this.currentUserSubject.next(updated);
      })
    );
  }

  getUsers() {
    const usersList = localStorage.getItem('user');
    if(usersList){
      this.users = JSON.parse(usersList);
    }
    return this.users;
  }
  getCurrentUserSnapshot() {
    return this.currentUserSubject.value;
  }
  isLoggedIn(): boolean{
    return !!this.currentUserSubject.value;
  }
}
