import { Component, OnInit } from '@angular/core';
import { BasePageComponent } from '@app/modules/core/components/bases/base-page-component';
import { RequestService } from '@app/modules/core/services/request.service';
import { AuthenticationService } from '@app/modules/core/services/authentication.service';
import { Router } from '@angular/router';
import { UserService } from '@app/modules/core/services/user.service';
import { AccountModel } from '@app/models/accounts/account-model';
import { SystemMessageService } from '@app/modules/core/services/system-message.service';
import { SystemMessageStatus } from '@app/models/system-messages/system-message-types';

@Component({
    selector: 'app-account-component',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.scss']
})
export class AccountComponent extends BasePageComponent implements OnInit {

    public model = new AccountModel();

    public disabled = false;

    public isLoad = false;

    constructor(
        public userService: UserService,
        private request: RequestService,
        private auth: AuthenticationService,
        private sm: SystemMessageService,
        private router: Router
    ) {
        super(userService);
    }

    public ngOnInit() {
        if (this.user) {
            this.model = new AccountModel(this.user);
        } else {
            this.router.navigate(['/account/login']);
        }
    }

    public save() {
        if (this.model.isModelValid()) {
            this.disabled = true;
            this.userService.updateUser(this.model).then(() => {
                this.disabled = false;
                this.model.resetPasswordState();
                this.displaySuccessMessage();
            }).catch((err) => {
                this.model.isCurrentPasswordValid = false;
                this.model.resetPasswordState();
                this.disabled = false;
                throw err;
            });
        }
    }

    private displaySuccessMessage() {
        this.sm.showMessage(this.strings.SAVE_ACCOUNT_SUCCESS, SystemMessageStatus.Success);
    }
}
