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