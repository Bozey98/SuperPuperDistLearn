import { Component, OnInit } from '@angular/core';
import { Test, Question, Answer } from '../../models/models'
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-test-ques',
  templateUrl: './test-ques.component.html',
  styleUrls: ['./test-ques.component.css']
})
export class TestQuesComponent implements OnInit {
  showQuesList:boolean = true;
  rightAns:number = 0;
  selectAns:Answer;
  testQues: Question[]  = [{
    name: "",
    answers: []
  }]
  testData: Test = {
    name : "",
    id: 0,
    questions:this.testQues
  }

  i = 0;

  nextQue() {
    this.i++;
    if (this.i == this.testData.questions.length) {
      alert("It is all");
      this.showQuesList = false;
      this.i = 0;
    }
  }

  isClicked(answ:Answer) {
    this.selectAns = answ;
    if (this.selectAns.isCorrect) {
      this.rightAns++;
    }
    
  }
  subs:Subscription;
  constructor(private activateRoute: ActivatedRoute, private http: HttpClient)
   { 
    this.subs = activateRoute.params.subscribe(params => this.testData.id = params['id']);
    console.log(this.testData.id)
   }

  ngOnInit() {
    this.http.post('http://localhost:5000/api/post/GetOne',this.testData).subscribe(
      (data:Test) => this.testData = data)
      this.rightAns = 0;
  }
  
}
