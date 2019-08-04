import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { never } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'FrontDistLearn';

  constructor(private Auth: AuthService, private router: Router) {}
  
  ngOnInit() {
    this.Auth.setUserInfo()
      .pipe(
        catchError(er => {
          this.router.navigate(['login']);
          return never();
        })
      )
      .subscribe(data => {
        if (data.login || data.mail) {
          this.Auth.setLoggedIn(true);
          this.router.navigate(['app-settings-menu'])
        }
        else {
          this.router.navigate(['login']);
        }
      })
  }
}


