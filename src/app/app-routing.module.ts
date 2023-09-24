import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashbardComponent } from './components/dashbard/dashbard.component';
import { AuthGuard } from './Guards/auth.guard';
import { ResetComponent } from './components/reset/reset.component';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'signup', component:SignupComponent},
  {path:'dashbard',component:DashbardComponent, canActivate:[AuthGuard]},
  {path: 'reset', component:ResetComponent},
  {path: 'users', component:UsersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
