import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Test, Question, Answer } from '../../models/models';
import { Subscription } from 'rxjs';
import { NgForm, FormGroup, FormControl, Validators} from '@angular/forms';


@Component({
  selector: 'app-edit-menu',
  templateUrl: './edit-menu.component.html',
  styleUrls: ['./edit-menu.component.css']
})
export class EditMenuComponent implements OnInit {
  
  correctId;
  kekmem:string[];
  correctAnswer;
  ansAccessBtn:boolean = false;
  oneClickToEnable:boolean = false;
  openMenu:boolean = false;
  showInfo:boolean = false;
  newName:string;
  testAns: Answer[] = [
    { name:"", id:0, isCorrect:false},
    { name:"", id:0, isCorrect:false},
    { name:"", id:0, isCorrect:false},
    { name:"", id:0, isCorrect:false}, 
  ];
  testQues:Question =
    {
      name:"",
      answers: this.testAns    
    };

  showQues:Question = {
      name:"",
      answers: this.testAns    
    };
  
  testData: Test = {
    id: 0,
    name: "Test"
    
  }



  private subs: Subscription;
  constructor( private activateRoute: ActivatedRoute, private http: HttpClient) 
  {
    this.subs = activateRoute.params.subscribe(params => this.testData.id = params['id']);
    
  }

  ngOnInit() {
    
    this.http.post('http://localhost:5000/api/post/GetOne', this.testData).subscribe(
      (data:Test) => this.testData = data)
    }

  changeName() {
    this.showInfo = false;
    console.log(this.newName)
    if (this.newName == undefined)
    {
      this.testData.name = this.testData.name;
    }
    else {
      this.testData.name = this.newName;
    }
    
    this.http.post('http://localhost:5000/api/post/EditTest', this.testData).subscribe(
      (data:Test) => this.testData = data)
      
  }

  openAddMenu() {
    this.zeroTheAnswer()
    this.ansAccessBtn = false;
    this.testQues =
    {
      name:"",
      answers: this.testAns    
    };
    this.showInfo = false;
    this.openMenu = true;
  }

  showQueInfo(queId) {
    this.zeroTheAnswer()
    this.oneClickToEnable = false;
    if (this.openMenu == false) {
      this.showInfo=true;
    }
    else {
      this.showInfo=true;
      this.openMenu = false;
    }
    this.showQues.answers = this.testAns;
    
    this.showQues.id = queId;
    this.http.post('http://localhost:5000/api/post/GetQues', this.showQues).subscribe(
      (data:Question) => {this.showQues = data
        console.log(this.showQues);
        this.correctId = this.showQues.answers.find(x => x.isCorrect == true);
        this.correctAnswer = this.showQues.answers.indexOf(this.correctId)+1;
        this.ansAccessBtn =  this.showQues.answers.every(val => !!val.name);
      });
    
  }

  addNewQuestion() {
  
    this.ansAccessBtn = false;
    this.testQues.answers[this.correctAnswer - 1].isCorrect = true;
    this.testQues.testId = this.testData.id;
    this.http.post('http://localhost:5000/api/post/AddQues', this.testQues).subscribe(
      (data:Test) => this.testData = data)
    this.openMenu = false;
  }

  editQuestion() {
    for (let ans of this.showQues.answers)
    {
      ans.isCorrect = false;
    }
    this.showQues.answers[this.correctAnswer - 1].isCorrect = true;
    this.http.post('http://localhost:5000/api/post/EditQuesAns', this.showQues).subscribe(
      (data:Question) => {this.showQues = data
      });
    this.showInfo = false;
  }

  zeroTheAnswer() {
    this.testAns = [
      { name:undefined, id:0, isCorrect:false},
      { name:undefined, id:0, isCorrect:false},
      { name:undefined, id:0, isCorrect:false},
      { name:undefined, id:0, isCorrect:false}, 
    ];
    this.correctAnswer = undefined;
  }

  checkAns(model) {
    this.ansAccessBtn = false;
    this.ansAccessBtn =  model.every(val => !!val.name);
    console.log(this.ansAccessBtn);
    this.oneClickToEnable = true;
  }
}
