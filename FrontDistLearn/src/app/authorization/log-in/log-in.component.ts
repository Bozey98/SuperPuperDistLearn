import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from 'src/app/models/models';
import { HttpClient } from '@angular/common/http';

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
  constructor(private http:HttpClient) { }

  ngOnInit() {
  }

  onSubmit() {
    this.User.login = this.authForms.value.inpLogin;
    this.User.password = this.authForms.value.inpPassword;
    this.http.post("http://localhost:5000/api/Auth/TestLogin", this.User).subscribe(
      (data) => console.log(data)
    )
    this.http.get("http://localhost:5000/api/Auth/GetInfo").subscribe(
      (data) => console.log(data)
    )
    
  }

}
