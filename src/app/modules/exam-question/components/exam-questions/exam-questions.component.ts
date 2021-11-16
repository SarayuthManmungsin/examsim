import { Component } from "@angular/core";
import { BasePageComponent } from "@app/modules/core/components/bases/base-page-component";
import { OnInit } from "@angular/core";
import { UserService } from "@app/modules/core/services/user.service";
import { TableModel } from "@app/models/table/table.model";
import { SidebarService } from "@app/modules/core/services/sidebar.service";
import { SidebarModel } from "@app/models/sidebars/sidebar-model";
import { SidebarView } from "@app/models/sidebars/sidebar-view";
import { TableHelper } from "@app/models/helpers/table-helper";
import { ExamTitleViewModel } from "@app/models/exam/exam-title-view.model";
import { ExamService } from "@app/modules/core/services/exam.service";
import {
    ExamQuestionViewModel,
    QuestionType,
} from "@app/models/exam/exam-question-view.model";
import { ActivatedRoute } from "@angular/router";
import { ExamAnswerViewModel, ExamSubAnswerViewModel } from "@app/models/exam/exam-answer-view.model";
import { DndDropEvent, DropEffect } from "ngx-drag-drop";
import { PersistanceService } from "@app/modules/core/services/persistence.service";
import { PagingResponse } from "@app/models/responses/paging-response";

@Component({
    selector: "app-exam-questions-component",
    templateUrl: "./exam-questions.component.html",
    styleUrls: ["./exam-questions.component.scss"],
})
export class ExamQuestionsComponent extends BasePageComponent implements OnInit {
    examid: string;
    totalScore: number = 0;
    shuffleQuestions: boolean;
    shuffleAnswers: boolean;
    showAnswerBtn: boolean;
    showCorrectAnswer: boolean;
    table = new TableModel();
    examQuestions: ExamQuestionViewModel[] = [];
    horizontalLayoutActive:boolean = false;
    pagingObjectString: string = 'paging-object';
    scoreObjectString: string = 'paging-score';
    pagingObject: any = {
        currentPage: 1,
        pageSize: 20,
        totalItems: 1,
        examTitle: '',
        totalPages: 1
    }

    // drag and drop
    layout: any;
    private readonly verticalLayout = {
        container: "row",
        list: "column",
        dndHorizontal: false,
    };
    private readonly horizontalLayout = {
        container: "row",
        list: "row",
        dndHorizontal: true,
    };

    constructor(
        public userService: UserService, 
        private sidebar: SidebarService,
        private examService: ExamService,
        private route: ActivatedRoute,
        private persistanceService: PersistanceService
    ) {
        super(userService);
        this.setHorizontalLayout(this.horizontalLayoutActive );
    }

    public ngOnInit() {

        this.route.queryParams.subscribe((params) => {
            this.examid = params.examid;
            this.shuffleQuestions = Boolean(JSON.parse(params.shuffleq));
            this.shuffleAnswers = Boolean(JSON.parse(params.shufflea));
            this.showAnswerBtn = Boolean(JSON.parse(params.showAnswer));
        });

        this.persistanceService.set(`${this.examid}-${this.scoreObjectString}-${this.pagingObject.currentPage}`, 0);

        const localexamQuestions = this.persistanceService.get<ExamQuestionViewModel[]>(`${this.examid}-${this.pagingObject.currentPage}`);
        const localPagingObject = this.persistanceService.get<any>(`${this.examid}-${this.pagingObjectString}-${this.pagingObject.currentPage}`);
        if (localexamQuestions && localexamQuestions.length > 0) {
            this.examQuestions = localexamQuestions;
            this.pagingObject = localPagingObject;
            return;
        }

        this.examService.getExamQuestions(this.pagingObject.currentPage, this.examid).then((res) => {
            this.initialExamQuestionsOption(res);
        });
    }

    initialExamQuestionsOption(res: PagingResponse<ExamQuestionViewModel>) {
        this.examQuestions = this.shuffleQuestions
                ? this.shuffle<ExamQuestionViewModel>(res.list)
                : res.list;
        this.examQuestions.forEach((examQuestion) => {
            examQuestion.selectedAnswers = new Array<string>();
            examQuestion.selectedSubAnswers = new Array<ExamSubAnswerViewModel>();
            examQuestion.answers = this.shuffleAnswers
                ? this.shuffle<ExamAnswerViewModel>(examQuestion.answers)
                : examQuestion.answers;
        });
        this.pagingObject.currentPage = res.pageNumber;
        this.pagingObject.pageSize = res.pageSize;
        this.pagingObject.totalItems = res.totalItems;
        this.pagingObject.examTitle = res.examTitle;
        this.pagingObject.totalPages = res.totalPages;

        this.persistanceService.set(`${this.examid}-${this.pagingObject.currentPage}`, this.examQuestions);
        this.persistanceService.set(`${this.examid}-${this.pagingObjectString}-${this.pagingObject.currentPage}`, this.pagingObject);
    }

    create() {
        this.sidebar.open(
            new SidebarModel<ExamQuestionViewModel>({
                title: `${this.strings.CREATE_EXAM}`,
                model: new ExamQuestionViewModel(),
                view: SidebarView.CREATE_EXAM,
                onSubmitted: (model: ExamQuestionViewModel) => {
                    this.table.reload();
                },
            })
        );
    }

    clear() {
        this.persistanceService.clearExcept('authorization');
        window.location.reload();
    }

    submitAnswer() {
        const currentScore = this.examQuestions.filter((x) => this.withCorrectAnswer(x)).length;
        this.persistanceService.set(`${this.examid}-${this.scoreObjectString}-${this.pagingObject.currentPage}`, currentScore);
        this.totalScore = currentScore;

        for (let index = 1; index <= this.pagingObject.totalPages; index++) {
            if (index === this.pagingObject.currentPage) continue;
            const pageScore = this.persistanceService.get<number>(`${this.examid}-${this.scoreObjectString}-${index}`);
            this.totalScore +=  pageScore;
        }
    }

    withCorrectAnswer(question: ExamQuestionViewModel): Boolean {
        {
            if (question.answers.length === 0) return false;

            let correctedCount = 0;
            if (question.questionType === QuestionType.DragAndDrop) {
                question.answers.forEach((answer) => {
                    const selectedSubAnswer = question.selectedSubAnswers[question.answers.indexOf(answer)];
                    if (selectedSubAnswer) 
                        correctedCount += this.isCorrectSubAnswer(answer, selectedSubAnswer.answerText) ? 1 : 0;
                });
            } else if (question.questionType === QuestionType.YesNo) {
                question.answers.forEach((answer, index) => {            
                    if (!question.selectedAnswers) return false;        
                    const selectedAnswer = question.selectedAnswers[index];
                    correctedCount += this.isCorrectSubAnswer(answer, selectedAnswer) ? 1 : 0;
                });
            } else {
                if(typeof question.selectedAnswers === 'string') {
                    const selectedAnswer = question.selectedAnswers as string;
                    correctedCount += question.answers.filter((x) => this.isCorrectAnswerString(x, selectedAnswer)).length;
                } else if (typeof question.selectedAnswers === 'boolean') {
                    const selectedAnswer = question.selectedAnswers as boolean;
                    correctedCount += question.answers.filter((x) => this.isCorrectAnswerBool(x, selectedAnswer)).length;
                } else {

                    if (!question.selectedAnswers) return false;

                    question.selectedAnswers.forEach((answer) => {
                        correctedCount += question.answers.filter((x) =>
                            this.isCorrectAnswerString(x, answer)
                        ).length;
                    });
                }                
            }            

            const requiredCorrect = question.answers.filter((x) => x.isCorrect).length;

            if (question.questionType === QuestionType.SingleChoice ||
                question.questionType === QuestionType.Dropdown) return correctedCount === 1;
            if (question.questionType === QuestionType.MultiChoice) return requiredCorrect === correctedCount && (question.selectedAnswers as string[]).length === requiredCorrect;
            if (question.questionType === QuestionType.YesNo || 
                question.questionType === QuestionType.DragAndDrop) return question.answers.length === correctedCount;

            return false;
        }
    }

    isCorrectAnswerString(answer: ExamAnswerViewModel, selectedAnswer: string): boolean {
        return answer.isCorrect === true && selectedAnswer === answer.id;
    }
    isCorrectAnswerBool(answer: ExamAnswerViewModel, selectedAnswer: boolean): boolean {
        return answer.isCorrect === selectedAnswer;
    }
    isCorrectSubAnswer(answer: ExamAnswerViewModel, selectedSubAnswer: string): boolean {
        return answer.matchedSubAnswer === selectedSubAnswer;
    }

    shuffle<T>(array): T[] {
        let shuffled = array
            .map((value) => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value);

        return shuffled;
    }

    setHorizontalLayout(horizontalLayoutActive: boolean) {
        this.layout = horizontalLayoutActive
            ? this.horizontalLayout
            : this.verticalLayout;
    }

    onDrop(event: DndDropEvent, list?: any[]) {
        if (
            list &&
            (event.dropEffect === "copy" || event.dropEffect === "move")
        ) {
            let index = event.index;

            if (typeof index === "undefined") {
                index = list.length;
            }

            list.splice(index, 0, event.data);
        }
    }

    onDragged(item: any, list: any[], effect: DropEffect) {

        if (effect === "move") {
            const index = list.indexOf(item);
            list.splice(index, 1);
        }
    }

    onCheckedAnswer(event, question: ExamQuestionViewModel, id: string) {

        if (!question.selectedAnswers) question.selectedAnswers = new Array<string>();
        let selectedAnswers = question.selectedAnswers as Array<string>;
        const answerIndex = selectedAnswers.indexOf(id);

        if (event.target.checked) {
            if (answerIndex === -1 ) selectedAnswers.push(id);
          } else {
             selectedAnswers.splice(answerIndex, 1);
          }
    }

    hasValue(question: ExamQuestionViewModel, inputValue: string) {
        let selectedAnswers = question.selectedAnswers as Array<string>;
        return selectedAnswers.some(x => x === inputValue);
    }

    onCheckedRadioAnswer(event, question: ExamQuestionViewModel, answerIndex: number) {

        if (!question.selectedAnswers) question.selectedAnswers = new Array<string>(question.answers.length);
        question.selectedAnswers[answerIndex] = event;
    }

    onPageChange(page: number) {

        // start set the current exam state
        this.persistanceService.set(`${this.examid}-${this.pagingObject.currentPage}`, this.examQuestions);
        this.persistanceService.set(`${this.examid}-${this.pagingObjectString}-${this.pagingObject.currentPage}`, this.pagingObject);

        this.submitAnswer();

        const localexamQuestions = this.persistanceService.get<ExamQuestionViewModel[]>(`${this.examid}-${page}`);
        const localPagingObject = this.persistanceService.get<any>(`${this.examid}-${this.pagingObjectString}-${page}`);
        if (localexamQuestions && localexamQuestions.length > 0) {
            this.examQuestions = localexamQuestions;
            this.pagingObject = localPagingObject;
            return;
        }
        this.examService.getExamQuestions(page, this.examid).then((res) => {
            this.initialExamQuestionsOption(res);
        });
    }
}