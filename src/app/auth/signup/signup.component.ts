import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../core/models/user.model';
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
 singup() {
  if (!this.name.trim() || !this.email.trim() || !this.password.trim()) {
    return;
  }

  if (this.password !== this.cfmPassword) {
    this.erroMsg = 'Confirm Password did not match';
    return;
  }

  const newUser: Omit<User, 'id'> = {
    name: this.name,
    email: this.email,
    password: this.password
  };

  this.authService.newUsers(newUser).subscribe({
    next: () => {
      this.resetValue();
      this.router.navigate(['/login']);
    },
    error: (err) => {
      if (err.status === 409) {
        this.erroMsg = 'Email already exists';
      } else {
        this.erroMsg = 'Signup failed. Please try again.';
      }
    }
    });
  }

  resetValue(){
    this.name = '';
    this.email = '';
    this.password = '';
    this.cfmPassword = '';
  }
}
