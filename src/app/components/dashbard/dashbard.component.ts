import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-dashbard',
  templateUrl: './dashbard.component.html',
  styleUrls: ['./dashbard.component.scss']
})
export class DashbardComponent implements OnInit {
  public users:any = [];
  public fullName: string = "";
  public role: string ="";
  constructor(private authService: AuthService, private apiService: ApiService, private userStoreService: UserStoreService) { }

  ngOnInit(): void {
    this.apiService.getUsers()
    .subscribe(res=> {
      this.users = res;
    });

    this.userStoreService.getFullNameFromStore()
    .subscribe(val =>{
      let fullNameToken = this.authService.getFullNameFromTokene();
      this.fullName = val || fullNameToken;
    });

    this.userStoreService.getRoleFromStore()
    .subscribe(val =>{
      let roleToken = this.authService.getRoleFromToken();
      this.role = val || roleToken;
    });

    console.log('Role: ' + this.role)
  }

  logout(){
    this.authService.signout();
  }

}
