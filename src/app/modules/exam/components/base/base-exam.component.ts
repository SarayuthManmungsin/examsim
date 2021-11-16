import { Component } from '@angular/core';
import { BasePageComponent } from '@app/modules/core/components/bases/base-page-component';
import { UserService } from '@app/modules/core/services/user.service';

@Component({
    selector: 'app-base-exam-component',
    templateUrl: './base-exam.component.html',
    styleUrls: ['./base-exam.component.scss']
})
export class BaseExamComponent extends BasePageComponent {

    constructor(public userService: UserService) {
        super(userService);
    }
}
