import { OnInit } from '@angular/core';
import { Strings } from '@app/configs/strings';
import { AppUserModel } from '@app/models/users/app-user.model';
import { UserService } from '@app/modules/core/services/user.service';

export class BaseSidebarViewComponent implements OnInit {

    public strings = Strings;

    public user: AppUserModel;

    constructor(public userService: UserService) {
        this.user = userService.getCurrentUserSync();
    }

    public ngOnInit() {

    }
}
