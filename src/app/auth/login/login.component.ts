import { CommonModule} from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginPayload } from '../../core/models/auth.model';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(
    private router: Router,
    private authService: AuthService
  ){}
  
  email = '';
  password = '';
  error? = '';

  goToSignup(){
    this.router.navigate(['/signup']);
  }

  login(){
    const result = this.authService.loggedIn({
      email: this.email,
      password: this.password
    });
    if(result.success){
      console.log('Logged In Successfully');
      this.router.navigate(['/dashboard']);
    }
    else {
      this.error = result.message;
    }
  }

}
