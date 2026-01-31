import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { User } from '../../core/models/user.model';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {

  constructor(
    private authService: AuthService,
    private router: Router
  ){}
  
  currentUser: User | null =null;

  ngOnInit(){
    this.currentUser = this.authService.getLoggedInUsers();
  }
  
  goToUserProfile(){
    this.router.navigate(['/user-profile']);
  }
  logout(){
    this.authService.logoutUser();
    this.router.navigate(['']);
  }
}
