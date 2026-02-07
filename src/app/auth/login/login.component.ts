import { CommonModule} from '@angular/common';
import { Component,} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { LoginPayload } from '../../core/models/auth.model';

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
    const payload : LoginPayload = {
      email : this.email,
      password : this.password
    }
    this.authService.loggedIn(payload).subscribe({
      next: (user) => {
        if(user.length){
          this.router.navigate(['/dashboard']);
        }
        else {
          this.error = 'email or password is wrong';
        }
      },
      error: () => {
        this.error = 'something went wrong, please try again later';
      }
    })
  }

}
