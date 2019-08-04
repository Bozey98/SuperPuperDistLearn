import { Component, OnInit } from '@angular/core';
import { User } from '../../models/models'
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { invalid } from '@angular/compiler/src/render3/view/util';

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  errorMessageEmpty: boolean = false;
  errorMessagePassConf: boolean = false;
  errorMessageExistLogin: boolean = false;

  regForms = new FormGroup({
    inpLogin: new FormControl("", Validators.required),
    inpPassword: new FormControl("", Validators.required),
    inpConfPassword: new FormControl("", Validators.required),
    inpMail: new FormControl("", Validators.required)
  })
  
  newUser:User = {
    id:0,
    login:"",
    password: "",
    mail: ""
    
  }


  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() 
  {
   
  }

  checkReg() {
    
    if (this.regForms.valid)
    {
      this.errorMessageEmpty = false;
      return true;
    }
    else
    {
      Object.keys(this.regForms.controls).forEach(field => { 
        const control = this.regForms.get(field);           
        control.markAsTouched({ onlySelf: true });      
      });
      this.errorMessageEmpty = true;
      return false;
    }
  }

  checkPassEqual() {
    
    if (this.regForms.value.inpConfPassword == this.regForms.value.inpPassword)
    {
      this.errorMessagePassConf = false;
      return true;
    }
    else
    {
      this.regForms.controls['inpConfPassword'].setErrors({'incorrect': true});
      this.errorMessagePassConf = true;
      return false;
    }
  }

  checkLoginExist(data) {
    if (data)
    {
      console.log(data);
      this.router.navigate(['login']);
    }
    else
    {
      this.regForms.controls['inpLogin'].setErrors({'incorrect': true});
      this.errorMessageExistLogin = true;
    }
  }

  removeErrorExistLogin() {
    this.errorMessageExistLogin = false;
  }

  removeErrorPassEuq() {
      this.regForms.controls['inpConfPassword'].updateValueAndValidity();
      this.errorMessagePassConf = false;
  }

  onSubmit() {
    this.newUser = {
      id:0,
      login:this.regForms.value.inpLogin,
      password:this.regForms.value.inpPassword,
      mail:this.regForms.value.inpMail
    }
    if (this.checkReg() && this.checkPassEqual()) {
      this.http.post('http://localhost:5000/api/auth/NewUser',this.newUser).subscribe(
        (data:User) => {
          this.checkLoginExist(data)
        })
    }
  }
}
