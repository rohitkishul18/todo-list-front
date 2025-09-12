import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  userEmail = '';
  password = '';
  error = '';

  constructor(private authService:AuthService,private router :Router){}
  
  login(){
     const data = {
      username: this.userEmail,
      password: this.password
    };
     this.authService.loginUser(data).subscribe({
      next: (res) => {
        console.log('Login success:', res);
        localStorage.setItem('user', JSON.stringify(res));
        this.router.navigate(['/todos']);
      },
      error: (err) => {
        console.error('Login failed:', err);
        this.error = err.error?.message || 'Login failed';
      }
    });
  }

 

}
