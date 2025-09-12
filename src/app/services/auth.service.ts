import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 private apiUrl = 'http://localhost:5000/api/auth';

   constructor(private http: HttpClient) {}

    loginUser(data:any):Observable<any>{
      return this.http.post(`${this.apiUrl}/login`, {
        email : data.username,
        password : data.password
      })
    }


    registerUser(data:any) : Observable<any>{
      return this.http.post(`${this.apiUrl}/register`,{
          name : data.name,
          email : data.email,
          mobile : data.mobile,
          password : data.password
      })
    }

} 
