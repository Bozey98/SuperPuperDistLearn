import { Component, OnInit } from '@angular/core';
import { User } from '../../models/models'
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  regForms = new FormGroup({
    inpLogin: new FormControl(""),
    inpPassword: new FormControl(""),
    inpMail: new FormControl("")
  })
  
  newUser:User = {
    id:0,
    login:"",
    password: "",
    mail: ""
    
  }


  constructor(private http: HttpClient) { }

  ngOnInit() 
  {
   
  }

  onSubmit() {
    this.newUser = {
      id:0,
      login:this.regForms.value.inpLogin,
      password:this.regForms.value.inpPassword,
      mail:this.regForms.value.inpMail
    }
    this.http.post('http://localhost:5000/api/auth/NewUser',this.newUser).subscribe(
      (data:User) => console.log(data)
    )
  }
}
