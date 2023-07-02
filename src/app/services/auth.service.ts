import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URLBased:string = "https://localhost:7290/api/User/"
  constructor(private http: HttpClient) { }

  logIn(loginObj: any){
    return this.http.post<any>(`${this.URLBased}authenticate`,loginObj)
  }

  signIn(userObj: any){
    return this.http.post<any>(`${this.URLBased}register`,userObj)
  }
}
