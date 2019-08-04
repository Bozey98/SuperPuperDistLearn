import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from 'src/app/models/models';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { catchError } from 'rxjs/operators';
import { never } from 'rxjs';

@Component({
  selector: 'login',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  authForms = new FormGroup({
    inpLogin: new FormControl(""),
    inpPassword: new FormControl(""),
  })
  
  User: User = {
    id:0,
    login:"",
    password:"",
    mail:""
  }
  constructor(private http:HttpClient, private router: Router, private Auth: AuthService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.User.login = this.authForms.value.inpLogin;
    this.User.password = this.authForms.value.inpPassword;
    this.http.post("http://localhost:5000/api/Auth/TestLogin", this.User).subscribe(
      (data) => {
        this.Auth.setUserInfo()
      .pipe(
        catchError(er => {
          this.router.navigate(['login']);
          return never();
        })
      )
      .subscribe(data => {
        if (data.login && data.mail) {
          console.log(data);
          this.Auth.setLoggedIn(true);
          this.router.navigate(['app-settings-menu'])
        }
        else {
          this.authForms.setValue({inpLogin: '', inpPassword: ''});
          alert("Неверный логин или пароль")
          this.router.navigate(['login']);
        }
      })
      })
  }
  

}
