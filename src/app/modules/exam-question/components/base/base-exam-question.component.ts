import { Component } from '@angular/core';
import { BasePageComponent } from '@app/modules/core/components/bases/base-page-component';
import { UserService } from '@app/modules/core/services/user.service';

@Component({
    selector: 'app-base-exam-question-component',
    templateUrl: './base-exam-question.component.html',
    styleUrls: ['./base-exam-question.component.scss']
})
export class BaseExamQuestionComponent extends BasePageComponent {

    constructor(public userService: UserService) {
        super(userService);
    }
}
