import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../core/models/user.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  imports: [CommonModule, FormsModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  constructor(
    private router: Router,
    private authService: AuthService
  ){}
  currentUser: User | null = null;

  ngOnInit(){
    this.currentUser = this.authService.getLoggedInUsers();
  }
}
