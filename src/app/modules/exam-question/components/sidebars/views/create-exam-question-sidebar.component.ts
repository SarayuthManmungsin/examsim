import {Component, OnInit} from '@angular/core';
import {UserService} from '@app/modules/core/services/user.service';
import {Input} from '@angular/core';
import {BaseSidebarViewComponent} from '@app/modules/core/components/bases/base-sidebar-view-component';
import {SidebarModel} from '@app/models/sidebars/sidebar-model';
import {Endpoints} from '@app/configs/endpoints';
import { ExamService } from '@app/modules/core/services/exam.service';
import { ExamQuestionViewModel, QuestionType } from '@app/models/exam/exam-question-view.model';
import { ActivatedRoute } from '@angular/router';
import { ExamAnswerViewModel } from '@app/models/exam/exam-answer-view.model';

@Component({
    selector: 'app-create-exam-question-sidebar-component',
    templateUrl: './create-exam-question-sidebar.component.html',
    styleUrls: ['./create-exam-question-sidebar.component.scss']
})
export class CreateExamQuestionSidebarComponent extends BaseSidebarViewComponent implements OnInit {

    @Input() sidebar: SidebarModel<ExamQuestionViewModel>;

    examid: string;
    public model: ExamQuestionViewModel;
    public questionTypes = [
        { type: "Single Choice", value: QuestionType.SingleChoice }, 
        { type: "Multi Choice", value: QuestionType.MultiChoice }, 
        { type: "Drag & Drop", value: QuestionType.DragAndDrop }
    ];

    constructor(public userService: UserService, private examService: ExamService, private route: ActivatedRoute) {
        super(userService);
    }

    public ngOnInit() {
        this.route.queryParams.subscribe(params => {
            this.examid = params.examid;
        });
        this.model = this.sidebar.model;
        this.sidebar.onSubmit = async (callback) => {
            const res = await this.createExamQuestion();
            if (res) {
                callback(res);
            }
        };
        this.sidebar.onReady();
    }

    private async createExamQuestion() {

        this.sidebar.loading();
        try {
            return await this.examService.createExamQuestion(this.model, this.examid);
        } catch (err) {
            this.sidebar.onReady();
            throw err;
        }
    }

    public addAnswer() {
        this.model.answers.push(new ExamAnswerViewModel());
    }
    public deleteAnswer(index: number) {
        this.model.answers.splice(index, 1);
    }
}
