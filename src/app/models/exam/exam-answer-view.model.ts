import { ValidationHelper } from '@app/models/helpers/validation-helper';

export class ExamAnswerViewModel {

    public id: string = '';
    public choiceNumber: number;
    public answerText: string = '';
    public isCorrect: boolean;
    public matchedSubAnswer: string = '';

    static makeList(data: Array<any>): ExamAnswerViewModel[] {
        const results = [];
        for (let i = 0; i < data.length; i++) {
            results.push({...data[i]} as ExamAnswerViewModel);
        }
        return results;
    }
}

export class ExamSubAnswerViewModel {

    public id: string = '';
    public choiceNumber: number;
    public answerText: string = '';
    
    static makeList(data: Array<any>): ExamSubAnswerViewModel[] {
        const results = [];
        for (let i = 0; i < data.length; i++) {
            results.push({...data[i]} as ExamSubAnswerViewModel);
        }
        return results;
    }
}