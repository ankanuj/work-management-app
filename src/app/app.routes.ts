import { Routes } from '@angular/router';
import { AuthPageComponent } from './auth/auth-page/auth-page.component';
import { TaskBoardComponent } from './tasks/components/task-board/task-board.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';

export const routes: Routes = [
    {
        path: '',
        component: AuthPageComponent,
        children: [
            {path: 'login', component: LoginComponent},
            {path: 'signup', component: SignupComponent},
        ]
    },
    {path: 'dashboard', component: TaskBoardComponent},
    {path: '**', redirectTo: 'login'}
];
