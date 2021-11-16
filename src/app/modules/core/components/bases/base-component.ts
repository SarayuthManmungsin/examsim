import { OnDestroy } from '@angular/core';
import { UserService } from '@app/modules/core/services/user.service';
import { AppUserModel } from '@app/models/users/app-user.model';
import { Strings } from '@app/configs/strings';
import { Subscription } from 'rxjs';

export class BaseComponent implements OnDestroy {

    public user: AppUserModel;

    public strings = Strings;

    private loginSubscribe: Subscription;

    constructor(public userService: UserService) {
        this.user = userService.getCurrentUserSync();
        this.loginWatch();
    }

    public ngOnDestroy() {
        if (this.loginSubscribe) {
            this.loginSubscribe.unsubscribe();
        }
    }

    private loginWatch() {
        this.loginSubscribe = this.userService.subscribeUserLogin(() => {
            this.user = this.userService.getCurrentUserSync();
        });
    }
}
