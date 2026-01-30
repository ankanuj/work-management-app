import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../core/models/user.model';
import { SignupPayload } from '../../core/models/auth.model';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-signup',
  imports: [FormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  constructor(
    private router: Router,
    private authService: AuthService
  ){}

  name: string = '';
  email: string = '';
  password: string = '';
  cfmPassword: string = '';
  erroMsg: string = '';

  goToLogin(){
    this.router.navigate(['/login']);
  }

  singup(){
    if(!this.name.trim() || !this.email.trim() || !this.password.trim()) return;
    if(this.password === this.cfmPassword){
      const newUser : User = {
        id: Date.now(),
        name: this.name,
        email: this.email,
        password: this.password
    }
    this.authService.newUsers(newUser);
    this.resetValue();
    this.router.navigate(['/dashboard']);
    }
    else {
      this.erroMsg = 'Confirm Password Did Not match';
    }
  }

  resetValue(){
    this.name = '';
    this.email = '';
    this.password = '';
    this.cfmPassword = '';
  }
}
