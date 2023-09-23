import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
private basedUrl: string ="https://localhost:7290/api/User"
  constructor(private http: HttpClient) { }

  getUsers(){
    return this.http.get<any>(this.basedUrl);
  }
}
