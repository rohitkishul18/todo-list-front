import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
      name:string  = '';
      mobile:string = '';
      email : string= '';
      password = '';
    error = '';
    data:object = {};
    constructor(private authService:AuthService, private router: Router){}

    registerUser(){
        const data = {
          name : this.name,
          email :this.email,
          mobile : this.mobile,
          password :this.password
        }
        this.authService.registerUser(data).subscribe({
          next : (value) => {
              console.log('Login success:', value);
            localStorage.setItem('user', JSON.stringify(value));
            this.router.navigate(['/todos']);
          },
          error :(err) => {
              console.error('Login failed:', err);
              this.error = err.error?.message || 'Login failed';
          },
        })
    }
}
