import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './rootPages/home/home.component';
import { LogInComponent } from './rootPages/login/login.component';
import { AuthGuardService as AuthGuard } from '../app/_helpers/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent,
   canActivate: [AuthGuard]
 },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LogInComponent,
  },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
