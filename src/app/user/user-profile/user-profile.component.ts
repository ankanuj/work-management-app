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
  updateUser: User | null = null;
  newPassword: string = '';
  cfmPassword: string = '';

  ngOnInit(){
    this.authService.currentUser$.subscribe( user => {
    this.currentUser = user;
   });
   this.updateUser = structuredClone(this.currentUser);
  }
  get isDirty() : boolean {
    return JSON.stringify(this.currentUser) !== JSON.stringify(this.updateUser);
  }

  update(){
    if(!this.updateUser?.name.trim()){
      return alert('Name Can Not Be Empty');
    }
    this.authService.updateUser(this.updateUser).subscribe({
      next: () => alert('User Updated Successfully')
    });
  }
  cancel(){
    this.updateUser = structuredClone(this.currentUser);
  }
}
