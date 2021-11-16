import { Component, OnInit } from '@angular/core';
import { BasePageComponent } from '@app/modules/core/components/bases/base-page-component';
import { Router } from '@angular/router';
import { UserService } from '@app/modules/core/services/user.service';
import { RecoveryPasswordModel } from '@app/models/accounts/recovery-password.model';
import { AuthenticationService } from '@app/modules/core/services/authentication.service';

@Component({
    selector: 'app-recovery-password-component',
    templateUrl: './recovery-password.component.html',
    styleUrls: ['./recovery-password.component.scss']
})
export class RecoveryPasswordComponent extends BasePageComponent implements OnInit {

    public model = new RecoveryPasswordModel();

    public disabled = false;

    public isLoad = false;

    public noEmail = false;

    public recoverySuccess = false;

    constructor(
        public userService: UserService,
        private authenticationService: AuthenticationService,
        private router: Router) {
        super(userService);
    }

    public ngOnInit() {
        this.model.email = this.authenticationService.getRecoveryEmail();
        if (!this.model.email) {
            this.noEmail = true;
        }
    }

    public onSubmit() {
        this.reset();
    }

    public onKeyPress(event) {
        if (event.keyCode === 13) {
            this.onSubmit();
        }
    }

    public onBack() {
        this.router.navigate(['/account/forget-password']);
    }

    public onBackToLogin() {
        this.router.navigate(['/account/login']);
    }

    private async reset() {
        if (!this.model.isModelValid()) {
            return;
        }
        this.loading();
        try {
            await this.userService.resetPassword(this.model);
            this.recoverySuccess = true;
        } catch (e) {
            this.onError();
            throw e;
        }
    }

    private loading() {
        this.model.isFail = false;
        this.isLoad = true;
        this.disableForm();
    }

    private onError() {
        this.model.isFail = true;
        this.enableFrom();
        this.recoverySuccess = true;
    }

    private disableForm() {
        this.disabled = true;
    }

    private enableFrom() {
        this.isLoad = false;
        this.disabled = false;
    }
}
