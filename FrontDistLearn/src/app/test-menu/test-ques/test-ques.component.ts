import { Component, OnInit } from '@angular/core';
import { Test, Question, Answer, CheckTest} from '../../models/models'
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-test-ques',
  templateUrl: './test-ques.component.html',
  styleUrls: ['./test-ques.component.css']
})
export class TestQuesComponent implements OnInit {
  nextBtnAccess:boolean = false;
  showQuesList:boolean = true;
  showFinishBtn:boolean = false;
  rightAns:number = 0;
  currentQue:number = 0;
  selectAns:Answer;
  testQues: Question[]  = [{
    name: ""
  }]
  testData: Test = {
    name : "",
    id: 0,
    questions:this.testQues
  }

  sendData:CheckTest = {
    id: 0,
    testId: 0,
    selectAnswers: []
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
      this.sendData.testId = this.testData.id;
  }
  

  nextQue() {
    this.nextBtnAccess = false;
    this.currentQue++;
    if (this.currentQue == this.testData.questions.length - 1) {
      this.showFinishBtn = true;
    }
  }

  isClicked(answ:Answer) {
    this.nextBtnAccess = true
    this.selectAns = answ;
    if (this.selectAns.isCorrect) {
      this.rightAns++;
    }
    this.sendData.selectAnswers.push(answ.id);
    
  }

  finishTest() {
    this.http.post('http://localhost:5000/api/post/HuiEgo',this.sendData).subscribe(
      (data:[]) => {
        console.log(data)
        this.rightAns = data.length;
      }
    )
      this.showFinishBtn = true;
      this.showQuesList = false;
      this.currentQue = 0;
  }
  
}
