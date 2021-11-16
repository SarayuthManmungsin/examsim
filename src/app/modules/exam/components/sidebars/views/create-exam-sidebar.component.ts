import {Component, OnInit} from '@angular/core';
import {UserService} from '@app/modules/core/services/user.service';
import {Input} from '@angular/core';
import {BaseSidebarViewComponent} from '@app/modules/core/components/bases/base-sidebar-view-component';
import {SidebarModel} from '@app/models/sidebars/sidebar-model';
import {Endpoints} from '@app/configs/endpoints';
import { ExamTitleViewModel } from '@app/models/exam/exam-title-view.model';
import { ExamService } from '@app/modules/core/services/exam.service';

@Component({
    selector: 'app-create-exam-sidebar-component',
    templateUrl: './create-exam-sidebar.component.html',
    styleUrls: ['./create-exam-sidebar.component.scss']
})
export class CreateExamSidebarComponent extends BaseSidebarViewComponent implements OnInit {

    @Input() sidebar: SidebarModel<ExamTitleViewModel>;

    public model: ExamTitleViewModel;

    constructor(public userService: UserService, private examService: ExamService) {
        super(userService);
    }

    public ngOnInit() {
        this.model = this.sidebar.model;
        this.sidebar.onSubmit = async (callback) => {
            const res = await this.createExam();
            if (res) {
                callback(res);
            }
        };
        this.sidebar.onReady();
    }

    private async createExam() {

        this.sidebar.loading();
        try {
            return await this.examService.create(this.model);
        } catch (err) {
            this.sidebar.onReady();
            throw err;
        }
    }
}
