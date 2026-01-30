import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';
import { User } from '../models/user.model';
import { LoginPayload, LoginResult } from '../models/auth.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService{
  users: User[] = [];
  currentUser: User | null = null;
  // private http = inject(HttpClient);
  // private api = 'http://localhost:3000';

  constructor() { }

  newUsers(user: User){
    this.users.push(user);
    this.saveUsersToLocaStorage();
    this.saveLoggedInUser();
  }

  loggedIn(user: LoginPayload): LoginResult {
    this.getUsers();
    const data = this.users.find(u => (user.email === u.email && user.password === u.password))
    if(!data){
      return {
        success : false,
        message : 'invaid user email or password'
      }
    };
    this.currentUser = data;
    this.saveLoggedInUser();

    return {
      success: true
    }
  }
  saveUsersToLocaStorage(){
    localStorage.setItem('user', JSON.stringify(this.users));
  }
  saveLoggedInUser(){
    localStorage.setItem('loggedInUser', JSON.stringify(this.currentUser));
  }

  getUsers() {
    const usersList = localStorage.getItem('user');
    if(usersList){
      this.users = JSON.parse(usersList);
    }
    return this.users;
  }
  getLoggedInUsers() {
    const user = localStorage.getItem('loggedInUser');
    if(user){
      this.currentUser = JSON.parse(user);
    }
    return this.currentUser;
  }

}
