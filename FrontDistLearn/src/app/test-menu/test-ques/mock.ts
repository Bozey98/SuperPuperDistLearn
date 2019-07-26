import { Question, Answer } from '../../models/models';
import { Tests } from '../test-menu.component';

export const Ans: Answer[] = [
    {
        isCorrect: false,
        id: 1,
        name: 'Ls lal lalal '
    },
    {
        isCorrect: true,
        id: 2,
        name: 'Ds Dal Dalal '
    },
    {
        isCorrect: false,
        id: 3,
        name: 'Ws Wal walal '
    },
    {
        isCorrect: false,
        id: 4,
        name: 'Ts lTl TTlal '
    }
]

export const Ques: Question[] = [
    {
        answers: Ans,
        id: 1,
        name: 'Правда ли что в графе есть гамильтонов цикл?'
    },
    {
        answers: Ans,
        id: 2,
        name: 'Что такое машина тьюринга?'
    },
    {
        answers: Ans,
        id: 3,
        name: 'Можно ли построить поле Ф64'
    },
    {
        answers: Ans,
        id: 4,
        name: 'Как проиходит запись данных в регистры в МТ1804'
    },
    {
        answers: Ans,
        id: 5,
        name: 'Отличия докера о lxc ?'
    }
]

export const Test1: Tests = {
    
    id: 1,
    name: 'Physics'
}

