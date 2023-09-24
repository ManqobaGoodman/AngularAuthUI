import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NgToastComponent, NgToastService } from 'ng-angular-popup';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {

  constructor(private auth: AuthService, private router: Router, private toster: NgToastService){

  }
  canActivate():boolean{
    if(this.auth.isLoggedIn()){
      return true;
    }else{
      this.toster.error({detail:'Error', summary:'Please login first'})
      this.router.navigate(['login']);
      return false;
    }
  }
  
}
