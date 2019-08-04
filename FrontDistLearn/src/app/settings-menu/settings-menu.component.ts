import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Test, Question, Answer, User} from '../models/models'


@Component({
  selector: 'app-settings-menu',
  templateUrl: './settings-menu.component.html',
  styleUrls: ['./settings-menu.component.css']
})
export class SettingsMenuComponent implements OnInit {
  cookieInfo;
  id: number;
  i:number = 1;
  testData:Test[];
  testObj:Test = {
    id:this.i,
    name: "NewTest"
  };
  

  constructor(private http: HttpClient, private activateRoute: ActivatedRoute) {
    this.id = activateRoute.snapshot.params['id'];
   }

  ngOnInit() {
    this.http.get('http://localhost:5000/api/values').subscribe((data:Test[]) => this.testData = data);
  }

  addNewTest() {
    if (this.testData.length == 0) {
      this.testObj.id = 1;
    }
    else {
    this.testObj.id = this.testData[this.testData.length - 1].id + 1;
    }
    this.http.post('http://localhost:5000/api/post/AddTest',this.testObj).subscribe(
      (data:Test) => this.testData.push(data))
  }

  deleteTest(deleteId) {
    this.testObj.id = deleteId;
    this.http.post('http://localhost:5000/api/post/DelTest',this.testObj).subscribe(
      (data:Test[]) => this.testData = data)


  }

}

