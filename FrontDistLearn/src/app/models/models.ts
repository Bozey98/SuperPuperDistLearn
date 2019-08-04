export class Test {
    id:number;
    name:string;
    questions?: Question[];

}

export class Question {
    id?:number;
    name:string;
    testId?:number;
    answers?: Answer[];

}

export class Answer {
    id:number;
    name:string;
    questionId?:number;
    isCorrect?:boolean;

}

export class CheckTest {
    studentLogin: string;
    id:number;
    selectAnswers: number[];
    testId:number;
}

export class User {
    id:number;
    login:string;
    password:string;
    mail:string;
}