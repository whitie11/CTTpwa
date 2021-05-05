import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './rootPages/home/home.component';
import { LogInComponent } from './rootPages/login/login.component';
import { AuthGuardService as AuthGuard } from '../app/_helpers/auth.guard';
import { LandingComponent } from './rootPages/landing/landing.component';
import { MessagesComponent } from './rootPages/messages/messages.component';
import { RostaComponent } from './rootPages/rosta/rosta.component';

const routes: Routes = [
  { path: '', component: LandingComponent,
  children: [
    {
      path: '',
      component: HomeComponent,
    }
  ],
  canActivate: [AuthGuard]
 },
  {
    path: 'home',
    component: LandingComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      }
    ],
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LogInComponent,
  },
  {
    path: 'messages',
    component: LandingComponent,
    children: [
      {
        path: '',
        component: MessagesComponent,
      }
    ],
    canActivate: [AuthGuard]
  },
  {
    path: 'rosta',
    component: LandingComponent,
    children: [
      {
        path: '',
        component: RostaComponent,
      }
    ],
    canActivate: [AuthGuard]
  },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
