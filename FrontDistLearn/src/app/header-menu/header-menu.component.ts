import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.css']
})
export class HeaderMenuComponent implements OnInit {
  kekUser: User = {
    id:0,
    login:"",
    password: "",
    mail:""
  }
  constructor(private http:HttpClient, private router: Router) { }

  ngOnInit() {
    
  }

  logout() {
    this.http.get("http://localhost:5000/api/auth/LogOut").subscribe(
      (data) => {
        this.router.navigate(['login'])
      }
    )
  }

}
