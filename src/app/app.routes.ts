import { Routes } from '@angular/router';
import { AuthPageComponent } from './auth/auth-page/auth-page.component';
import { TaskBoardComponent } from './tasks/components/task-board/task-board.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { authGuard } from './core/guard/auth.guard';
import { loginGuard } from './core/guard/login.guard';

export const routes: Routes = [
    {
        path: '',
        component: AuthPageComponent,
        children: [
            {path: '', redirectTo: 'login', pathMatch: 'full'},
            {path: 'login', component: LoginComponent, canActivate: [loginGuard]},
            {path: 'signup', component: SignupComponent, canActivate: [loginGuard]},
        ]
    },
    {path: 'dashboard', component: TaskBoardComponent, canActivate: [authGuard]},
    {path: '**', redirectTo: 'login', pathMatch: 'full'}
];
