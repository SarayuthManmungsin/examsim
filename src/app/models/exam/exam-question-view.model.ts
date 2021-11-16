import { ValidationHelper } from "@app/models/helpers/validation-helper";
import { ExamAnswerViewModel, ExamSubAnswerViewModel } from "./exam-answer-view.model";

export class ExamQuestionViewModel {
    public id: string = "";
    public questionNumber: number = 0;
    public questionText: string = "";
    public questionType: QuestionType = QuestionType.SingleChoice;
    public hint: string = "";
    public answers: ExamAnswerViewModel[] = [];
    public subAnswers: ExamSubAnswerViewModel[] = [];
    
    public showCorrectAnswer: boolean;
    public selectedAnswers: boolean | string | string[] = [];
    public selectedSubAnswers: ExamSubAnswerViewModel[] = [];

    static makeList(data: Array<any>): ExamQuestionViewModel[] {
        const results = [];
        for (let i = 0; i < data.length; i++) {
            results.push({ ...data[i] } as ExamQuestionViewModel);
        }
        return results;
    }
}

export enum QuestionType {
    SingleChoice,
    MultiChoice,
    DragAndDrop,
    Dropdown,
    YesNo
}
