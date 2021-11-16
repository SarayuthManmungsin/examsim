import { Component } from '@angular/core';
import { BasePageComponent } from '@app/modules/core/components/bases/base-page-component';
import { OnInit } from '@angular/core';
import { UserService } from '@app/modules/core/services/user.service';
import { TableModel } from '@app/models/table/table.model';
import { SidebarService } from '@app/modules/core/services/sidebar.service';
import { SidebarModel } from '@app/models/sidebars/sidebar-model';
import { SidebarView } from '@app/models/sidebars/sidebar-view';
import { TableHelper } from '@app/models/helpers/table-helper';
import { ExamTitleViewModel } from '@app/models/exam/exam-title-view.model';
import { ExamService } from '@app/modules/core/services/exam.service';

@Component({
    selector: 'app-exams-component',
    templateUrl: './exams.component.html',
    styleUrls: ['./exams.component.scss']
})
export class ExamsComponent extends BasePageComponent implements OnInit {

    public table = new TableModel();

    constructor(public userService: UserService, private sidebar: SidebarService, private examService: ExamService) {
        super(userService);
    }

    public ngOnInit() {
        this.createTable();
    }

    public create() {
        this.sidebar.open(new SidebarModel<ExamTitleViewModel>({
            title: this.strings.CREATE_EXAM,
            model: new ExamTitleViewModel(),
            view: SidebarView.CREATE_EXAM,
            onSubmitted: (model: ExamTitleViewModel) => {
                this.table.reload();
            }
        }));
    }

    private createTable() {
        this.table = TableHelper.examTable();
    }
}
