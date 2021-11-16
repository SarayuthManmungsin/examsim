import { Component } from '@angular/core';
import { BasePageComponent } from '@app/modules/core/components/bases/base-page-component';
import { UserService } from '@app/modules/core/services/user.service';

@Component({
    selector: 'app-base-user-component',
    templateUrl: './base-user.component.html',
    styleUrls: ['./base-user.component.scss']
})
export class BaseUserComponent extends BasePageComponent {

    constructor(public userService: UserService) {
        super(userService);
    }
}
