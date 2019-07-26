import { Component, OnInit, Input } from '@angular/core';
import { Ques } from './test-ques/mock'
import { Test, Question, Answer } from '../models/models';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Component({
  selector: 'app-test-menu',
  templateUrl: './test-menu.component.html',
  styleUrls: ['./test-menu.component.css']
})
export class TestMenuComponent implements OnInit {
  testData:Tests[];
  inpName: string;
  inpId: string;
  memKek: Tests = {
    id: 1,
    name: "SuperMem"
  }

  
  

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('http://localhost:5000/api/values').subscribe((data:Tests[]) => this.testData = data);
  }

  

  testOut() {
    this.memKek.name = this.inpName;
    this.http.post('http://localhost:5000/api/values', this.memKek).subscribe(
      (data: Tests) => {
        
        this.testData[data.id] = data;
      },
      
      response => {
          console.log("POST call in error", response);
      });
      
  }

}

export interface Tests {
  
  id:number;
  name:string;
}


